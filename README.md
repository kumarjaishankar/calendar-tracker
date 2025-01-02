calendar-tracker
Calendar Application for Communication Tracking The Calendar Application is a React-based tool designed to efficiently manage and track interactions with companies. It ensures timely follow-ups, organizes communication schedules, and provides actionable insights, fostering effective professional relationship management.

File and Folder Structure src components CalendarView.js: Handles the calendar interface for viewing past and future communications. CommunicationForm.js: Modal for logging new communications. CommunicationMethodRow.js: Displays individual communication methods for admin management. CompanyRow.js: Represents a single company in the dashboard grid. Dashboard.js: Displays the user dashboard with company communication details. Notification.js: Handles overdue and today’s communication notifications.

contexts AuthContext.js: Manages user authentication and role information. CommunicationContext.js: Handles communication-related data and actions.

utils dateUtils.js: Provides functions for date manipulation and formatting. validationUtils.js: Includes logic for input validation and error handling.

views AdminPage.js with admin.css: Provides features for managing companies and communication methods. Home.js with home.css: Acts as the landing page for the application. ReportPage.js with report.css: Displays reports and analytics data. UserPage.js with user.css: Enables users to track and log communication tasks.

app.css: Defines global styles for the application. App.js: The root component that handles application routing and layout. index.js: Entry point for rendering the application.

Features Admin Module Manage companies by adding, editing, and deleting records with fields such as name, location, LinkedIn profile, email addresses, phone numbers, comments, and communication periodicity. Define and manage communication methods, specifying the name, description, sequence, and mandatory status. The default sequence includes LinkedIn Post, LinkedIn Message, Email, Phone Call, and Other. User Module The dashboard displays a grid view featuring company details, the last five communications, next scheduled communications, and highlights for due or overdue tasks. Notes can be viewed through hover effects, and overdue highlights can be manually overridden. Communication logging is enabled via a modal form where users can select the type, input the date, and add comments. Once submitted, overdue or due indicators are cleared for the respective company. Notifications include a badge for overdue and today’s communications, along with detailed grids for each. The calendar view shows past interactions and scheduled communications, allowing users to manage these effectively. Reporting and Analytics Module (Optional) Generate reports showing communication frequency by type over time. Monitor engagement effectiveness by tracking the success rate of various communication methods. Analyze overdue trends with visual tools like heatmaps or trendlines. Export data to PDF or CSV formats for offline analysis. View a real-time activity log of communication events.

Live Deployment: The application is hosted on GitHub Pages. The live URL can be added here when available. Testing and Validation The application has been tested with mock data to ensure smooth performance and validate inputs. It is optimized for error-free and efficient rendering.
