import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { BundleUpdaterManager } from "@lib/native";
import settings from "@lib/settings";
import { removeMMKVBackend, useProxy } from "@lib/storage";
import { url, ReactNative as RN } from "@metro/common";
import { ButtonColors } from "@types";
import { showConfirmationAlert } from "@ui/alerts";
import { getAssetIDByName } from "@ui/assets";
import { ErrorBoundary, Forms, Summary } from "@ui/components";
import Version from "@ui/settings/components/Version";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;
const debugInfo = getDebugInfo();

export default function General() {
  useProxy(settings);

  const versions = [
    {
      label: "Revenge (MODDED - 5xdf)",
      version: debugInfo.vendetta.version,
      icon: "ic_progress_wrench_24px"
    },
    {
      label: "Discord (MODDED)",
      version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
      icon: "Discord"
    },
    {
      label: "React",
      version: debugInfo.react.version,
      icon: "ic_category_16px"
    },
    {
      label: "React Native",
      version: debugInfo.react.nativeVersion,
      icon: "mobile"
    },
    {
      label: "Bytecode",
      version: debugInfo.hermes.bytecodeVersion,
      icon: "ic_server_security_24px"
    }
  ];

  const platformInfo = [
    {
      label: "Loader",
      version: debugInfo.vendetta.loader,
      icon: "ic_download_24px"
    },
    {
      label: "Operating System",
      version: `${debugInfo.os.name} ${debugInfo.os.version}`,
      icon: "ic_cog_24px"
    },
    ...(debugInfo.os.sdk
      ? [
          {
            label: "SDK",
            version: debugInfo.os.sdk,
            icon: "ic_profile_badge_verified_developer_color"
          }
        ]
      : []),
    {
      label: "Manufacturer",
      version: debugInfo.device.manufacturer,
      icon: "ic_badge_staff"
    },
    {
      label: "Brand",
      version: debugInfo.device.brand,
      icon: "ic_settings_boost_24px"
    },
    {
      label: "Model",
      version: debugInfo.device.model,
      icon: "ic_phonelink_24px"
    },
    {
      label: RN.Platform.select({ android: "Codename", ios: "Machine ID" })!,
      version: debugInfo.device.codename,
      icon: "ic_compose_24px"
    }
  ];

  return (
    <ErrorBoundary>
      <RN.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 38 }}
      >
        <FormSection title="Testin'">
          <FormDivider />
          <FormRow
            label="Change app font"
            leading={
                <FormRow.Icon source={getAssetIDByName("ic_information_filled_24px")} />
            }
            onPress={() =>
                showConfirmationAlert({
                    title: "This is not done",
                    content: "Hey there! I see you are trying to change the font of everything. Unfortanetly, I am not skilled enough at TypeScript to do this. Maybe later I could try implementing this.",
                    confirmText: "Okay.",
                    cancelText: "Cancel",
                    confirmColor: ButtonColors.RED,
                    onConfirm: () => {
                        console.log("ok");
                    }
                })
            }
          />
        </FormSection>
      </RN.ScrollView>
    </ErrorBoundary>
  );
}
