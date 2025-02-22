const { google } = require("googleapis");
const key = require("./your-service-account.json"); // Your service account JSON file

async function getAnalyticsData() {
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });

  const analyticsData = google.analyticsdata({
    version: "v1beta",
    auth: await auth.getClient(),
  });

  const response = await analyticsData.properties.runReport({
    property: "properties/G-V39S3ZR163", // Replace with your GA4 property ID
    requestBody: {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "screenPageViews" }],
      dimensions: [{ name: "pagePath" }],
    },
  });

  console.log(response.data);
}

getAnalyticsData();
