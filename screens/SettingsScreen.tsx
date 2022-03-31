import { Text, View } from "../components/Themed"
import { RootStackScreenProps, TabScreenProps } from "../navigation/types"

function SettingsScreen(props: TabScreenProps<"Settings">) {
    return <View>
        <Text>Settings</Text>
    </View>
}

export default SettingsScreen;