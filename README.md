# Custom New Tab Dashboard

A modern, responsive dashboard that combines daily task planning with quick access to essential tools. Built with React and Tailwind CSS.

## Features

### Daily Planning Section
- **Dynamic Heading**: Transforms from "What are we going to do today?" to "Today's Tasks" when tasks are added
- **Task Management**: Add, complete, and delete tasks with a clean interface
- **Drag & Drop**: Reorder tasks by dragging them
- **Persistence**: Tasks are saved to localStorage and persist throughout the day
- **Daily Reset**: All tasks are automatically cleared at the start of a new calendar day
- **Visual Feedback**: Completed tasks get strikethrough and fade effects

### Quick Links Section
- **Six Essential Tools**: Pre-configured links to your most-used applications
- **Responsive Grid**: Adapts from 2-3 columns on mobile to 3-4 columns on desktop
- **Modern Tiles**: Beautiful gradient icons with hover effects
- **One-Click Access**: Opens links in new tabs

### Design Features
- **Modern UI**: Clean, minimalist design with soft shadows and rounded corners
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: Subtle transitions and hover effects
- **First-View Layout**: Everything fits in the viewport without scrolling

## Quick Links Included
1. **ChatGPT** - AI chat interface
2. **Notion Dashboard** - Daily planning workspace
3. **Udemy Courses** - Learning platform
4. **Google Tag Manager** - Analytics management
5. **Google Analytics** - Website analytics
6. **Jira Issues** - Project management (filtered for TWR project)

## Installation

1. **Clone or download** this repository
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. **Open your browser** to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Usage as New Tab Page

To use this as your browser's new tab page:

1. **Build the project**: `npm run build`
2. **Install a browser extension** like "New Tab Redirect" (Chrome) or "New Tab Override" (Firefox)
3. **Set the new tab URL** to your deployed dashboard URL

## Technical Details

### Key Components
- **DailyPlanner**: Handles task management with localStorage persistence
- **QuickLinks**: Displays the grid of quick access tiles
- **App**: Main layout component with responsive design

### LocalStorage Structure
- `tasks`: Array of task objects with completion status
- `lastResetDate`: Date string to track daily resets

### Responsive Breakpoints
- **Mobile**: 2 columns for quick links
- **Tablet**: 3 columns for quick links
- **Desktop**: 3-4 columns for quick links, side-by-side layout

## Customization

### Adding New Quick Links
Edit `src/components/QuickLinks.js` and add new entries to the `quickLinks` array:

```javascript
{
  id: 7,
  name: 'Your App',
  url: 'https://yourapp.com',
  icon: YourIcon,
  color: 'from-pink-400 to-pink-600'
}
```

### Styling Changes
- Main styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles are inline with Tailwind classes

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License
MIT License - feel free to modify and use as needed. 