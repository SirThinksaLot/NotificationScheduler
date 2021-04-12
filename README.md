# Notification Scheduler
1. Use the command sails lift or npm start to start the server
2. The main controller file is in directory /api/controllers/NotificationController.js
3. User Invertory and NotificationLogs model files are in /api/models/Users.js and Notification.js likewise.
4 . Node-schedule is used to schedule cron-like jobs for scheduling notifications in the /api/services folder
5. Every different notification mode will have a seperate module in /api/services folder with Sms.js for the time being



