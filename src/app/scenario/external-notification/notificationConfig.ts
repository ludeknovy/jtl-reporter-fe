export const notificationConfig = {
  notificationType: new Map([
    ["report_detail", "Report generated"],
    ["degradation", `Degradation of performance`]
  ]),
  channels: new Map([
    ["MS Teams", {
      key: "ms-teams",
      helpUrl: "https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook#add-an-incoming-webhook-to-a-teams-channel"
    }],
    ["GChat", { key: "gchat", helpUrl: "https://developers.google.com/chat/how-tos/webhooks#create_a_webhook" }],
    ["Slack", { key: "slack", helpUrl: "https://api.slack.com/messaging/webhooks#getting_started" }]
  ])
};
