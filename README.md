# mCloud

A modern, full-featured cloud ecosystem inspired by Apple iCloud. mCloud offers a unified platform for managing your digital life with beautiful design and seamless integration across all your devices.

## Features

- **mCloud Drive** - Cloud storage for all your files, with 5 GB free
- **Unified Mail** - All your messages organized in one beautiful inbox
- **mCloud Photos** - AI-organized memories, always with you
- **Notes** - Capture ideas and sync across all devices
- **Calendar** - Schedule and manage your time
- **Contacts** - Keep your connections organized
- **Reminders** - Never forget what's important
- **Find My** - Locate your devices and share your location
- **Pages** - Create beautiful documents
- **Numbers** - Build spreadsheets with ease
- **Keynote** - Create stunning presentations

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js (Vercel Serverless Functions)
- **Authentication:** JWT with HTTP-only cookies, bcryptjs for password hashing
- **Deployment:** Vercel
- **Domain:** cloud.mosiur.com

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ai-mosiur/ai-engine-mosiur-cloud.git
cd mCloud
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server locally:
```bash
npm run dev
```

This will start a local Vercel dev environment on `http://localhost:3000`

### Deployment

Deploy to Vercel with a single command:
```bash
npm run build
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

```
mCloud/
├── public/                 # Static assets and HTML pages
│   ├── *.html             # App pages (dashboard, mail, drive, etc.)
│   ├── style.css          # Comprehensive design system
│   ├── app.js             # Shared utilities (dark mode, toasts, modals)
│   └── favicon.svg        # Brand icon
├── api/                   # Vercel serverless functions
│   ├── auth/
│   │   ├── login.js       # Login endpoint
│   │   ├── register.js    # Registration endpoint
│   │   ├── session.js     # Session validation
│   │   └── logout.js      # Logout endpoint
│   ├── mail/index.js      # Mail API stub
│   ├── drive/index.js     # Drive API stub
│   ├── contacts/index.js  # Contacts API stub
│   ├── notes/index.js     # Notes API stub
│   ├── calendar/index.js  # Calendar API stub
│   ├── photos/index.js    # Photos API stub
│   ├── reminders/index.js # Reminders API stub
│   └── findmy/index.js    # Find My API stub
├── package.json           # Project metadata and dependencies
├── vercel.json           # Vercel configuration
└── README.md             # This file
```

## Authentication

The app uses JWT-based authentication with HTTP-only cookies:

- **Login:** POST `/api/auth/login` - Authenticates user and returns JWT in cookie
- **Register:** POST `/api/auth/register` - Creates new user account
- **Session:** GET `/api/auth/session` - Validates current session
- **Logout:** POST `/api/auth/logout` - Clears authentication cookie

Demo credentials:
- Email: `demo@mosiur.com`
- Password: `demo123`

## Design System

mCloud uses a comprehensive design system with:

- **Brand Color:** #6C47FF (Primary Accent)
- **Light Accent:** #9B7FFF
- **Font:** Inter (via Google Fonts)
- **Dark Mode:** Full light/dark theme support
- **Spacing:** 8px base unit system
- **Radius:** Flexible border radius scale
- **Typography:** Carefully tuned font sizes and weights
- **Components:** Buttons, forms, modals, toasts, cards, and more

## API Endpoints

All API responses include CORS headers for cross-origin requests.

### Auth Endpoints

- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/register` - Register new account
- `GET /api/auth/session` - Get current session info
- `POST /api/auth/logout` - Logout user

### Service Endpoints (Stubs)

- `GET /api/mail` - Get user emails
- `POST /api/mail` - Send email
- `GET /api/drive` - List files
- `POST /api/drive` - Upload file
- `DELETE /api/drive` - Delete file
- `GET /api/contacts` - List contacts
- `POST /api/contacts` - Create contact
- `GET /api/notes` - List notes
- `POST /api/notes` - Create note
- `GET /api/calendar` - List events
- `POST /api/calendar` - Create event
- `GET /api/photos` - List photos
- `POST /api/photos` - Upload photo
- `GET /api/reminders` - List reminders
- `POST /api/reminders` - Create reminder
- `GET /api/findmy` - List devices

## Features in Detail

### Security

- HTTP-only cookies prevent XSS attacks
- CORS headers prevent cross-origin attacks
- Password hashing with bcryptjs
- JWT token expiration (7 days)
- Content Security headers

### User Experience

- Dark/light mode toggle
- Toast notifications
- Modal dialogs with keyboard navigation
- Responsive design for all screen sizes
- Smooth animations and transitions
- Accessible form controls

### Performance

- Serverless functions scale automatically
- Edge-optimized delivery via Vercel CDN
- Efficient CSS with variables
- Minimal JavaScript dependencies
- Optimized asset loading

## Future Enhancements

- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] File upload and storage
- [ ] Email sending service
- [ ] Real calendar synchronization
- [ ] Push notifications
- [ ] Offline support with service workers
- [ ] Mobile app (React Native)
- [ ] Two-factor authentication
- [ ] Sharing and collaboration features
- [ ] Advanced search functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Built with care by [Mosiur R Imraan](https://mosiur.com)

## Support

For issues, questions, or feedback:
- GitHub Issues: [ai-engine-mosiur-cloud/issues](https://github.com/ai-mosiur/ai-engine-mosiur-cloud/issues)
- Email: me@mosiur.com
- Twitter: [@mosiur](https://twitter.com/mosiur)

---

**mCloud** — Your personal cloud. Photos, files, notes, and mail — all in one beautiful place.
