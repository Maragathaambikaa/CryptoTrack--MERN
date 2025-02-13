// services/alertService.js
import axios from 'axios';
import sendEmailNotification from './emailService'; // Email service for sending emails
import admin from './firebase'; // Firebase admin for push notifications
import Alert from '../../models/AlertModel'; // Alert model to interact with the database

/**
 * 🚀 Check Price Alerts Every 60 Seconds
 */
export async function checkPriceAlerts() {
  setInterval(async () => {
    try {
      const alerts = await Alert.find(); // Get all alerts from the database
      if (alerts.length === 0) return;

      // Fetch live coin prices
      const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");

      for (const alert of alerts) {
        const coinData = data.find((c) => c.id === alert.coinId);
        if (coinData && coinData.current_price >= alert.targetPrice) {
          console.log(`🔔 ALERT: ${alert.coinName} hit target price of $${alert.targetPrice}!`);

          // Send Email Notification
          sendEmailNotification(
            alert.email, // Send to the user's email
            'Price Alert Triggered!',
            `The price of ${alert.coinName} has reached the target price of $${alert.targetPrice}.`
          );

          // Send Push Notification (if FCM token is available)
          if (alert.fcmToken) {
            sendPushNotification(alert.fcmToken, alert.coinName, alert.targetPrice);
          }

          await Alert.findByIdAndDelete(alert._id); // Remove alert after triggering
        }
      }
    } catch (error) {
      console.error("Error checking price alerts:", error);
    }
  }, 60000); // Run every 60 seconds
}

/**
 * 🛠 Send Push Notification
 */
const sendPushNotification = (fcmToken, coinName, targetPrice) => {
  const message = {
    notification: {
      title: `Price Alert: ${coinName}`,
      body: `The price of ${coinName} has reached your target price of $${targetPrice}`,
    },
    token: fcmToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Push notification sent:', response);
    })
    .catch((error) => {
      console.error('Error sending push notification:', error);
    });
};
