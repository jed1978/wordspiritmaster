import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { STRINGS } from "@/utils/strings";

export function useNotification() {
  async function requestPermission(): Promise<boolean> {
    if (Platform.OS === "web") return false;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  async function scheduleDailyReminder(
    hour: number,
    minute: number,
    dueCount: number,
  ): Promise<void> {
    if (Platform.OS === "web") return;
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: STRINGS.notifTitle,
        body: STRINGS.notifBody(dueCount),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }

  async function cancelAll(): Promise<void> {
    if (Platform.OS === "web") return;
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  return { requestPermission, scheduleDailyReminder, cancelAll };
}
