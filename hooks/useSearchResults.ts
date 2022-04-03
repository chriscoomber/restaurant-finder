import { useEffect, useRef, useState } from "react";
import { BASEURL, HEADERS, SEARCH_ROUTE } from "../apis/yelp";
  
export default function useSearchResults<Params, Result>(
    requestBuilder: (params: Params) => {info: RequestInfo, init?: RequestInit},
    jsonParser: (json: object) => Result): [Result | string | null, (params: Params) => void] {
  
    type SearchInProgress = {
        abortController: AbortController,
        searchParams: Params,
        searchId: number
    }

  const [searchResults, setSearchResults] = useState<Result | string | null>(null);
  const searchId = useRef(0);
  const searchInProgress = useRef<SearchInProgress | null>(null)

  // "launch" indicates we fire and forget
  function launchSearch(params: Params) {
    if (searchInProgress.current === null || searchInProgress.current.searchParams != params) {
      // Need a new search.
      console.log("Launching new search: " + params)

      if (searchInProgress.current !== null) {
        // Cancel current one
        console.log("Canceling old one: " + JSON.stringify(searchInProgress.current));
        searchInProgress.current.abortController.abort();
        searchInProgress.current = null;
      }

      // Perform the search
      searchId.current += 1;
      search(params, searchId.current);
    } else {
      console.log("Already got a search with that term in progress: " + params);
    }
  }

  async function search(params: Params, id: number) {
    const abortController = new AbortController();

    // Abort after 10000ms, whatever happens
    const timeout = setTimeout(() => {
      console.log("Canceling search after timeout: " + params + " " + id)
      abortController.abort();
      // If this search was still the current search, remove it.
      if (searchInProgress.current?.searchId == id) {
        console.log("Removing cancelled search: " + JSON.stringify(searchInProgress.current))
        searchInProgress.current = null
      }
    }, 10000);

    console.log("Kicking off new search: " + params + " " + id)

    try {
      searchInProgress.current = {
        abortController: abortController,
        searchParams: params,
        searchId: id
      };

      const { info, init } = requestBuilder(params);
      console.log(`Fetching: ${info}`)
      const response = await fetch(info, {...init, signal: abortController.signal });

      if (!response.ok) {
        throw Error("Received error response: " + response.status);
      }

      // Success!
      const json = await response.json();
      console.log("Search success: " + params + " " + id);
      const results = jsonParser(json);
      console.log(results);
      setSearchResults(results);

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log("Search cancelled: " + params + " " + id);
      } else {
        console.error(error);
        setSearchResults("Something went wrong");
      }
    } finally {
      clearTimeout(timeout)
      if (searchInProgress.current?.searchId == id) {
        console.log("Removing finished search: " + JSON.stringify(searchInProgress.current))
        searchInProgress.current = null
      }
    }
  }

  return [searchResults, launchSearch];
};
