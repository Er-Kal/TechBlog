# Tech Blog

## Description
Tech Blog is a full-stack web application built with Next.js that allows users to submit, view, and interact with technical blog posts. It features user authentication, blog management, commenting, and liking functionality, making it an ideal platform for tech enthusiasts to share and discuss content.

## Features
- User authentication (login/signup)
- Blog submission and management
- View latest and individual blog posts
- Commenting system on blog posts
- Like counter for blog posts
- User profiles with bio and profile picture upload
- Responsive design with React components

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Supabase (database and authentication)
- **Styling**: CSS Modules
- **Other**: ESLint for linting, Marked for markdown parsing, DOMPurify for content sanitization

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tech-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Install Supabase CLI if not already installed
   - Start Supabase locally:
     ```bash
     supabase start
     ```
   - Configure your Supabase project (refer to `supabase/config.toml`)

4. Create environment variables:
   - Copy `.env.local` template and add your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Home Page**: View the latest blog posts
- **Authentication**: Sign up or log in to access user features
- **Submit Blog**: Create and submit new blog posts
- **Blog View**: Read individual posts, like them, and add comments
- **Profile**: Manage your user profile, including bio and profile picture
- **Submissions**: View and manage your submitted blogs

## Project Structure
- `src/app/`: Next.js app router pages and components
  - `auth/`: Authentication pages (login, signup, confirm)
  - `blog/[id]/`: Individual blog view with comments and likes
  - `profile/[id]/`: User profile pages
  - `submit-blog/`: Blog submission functionality
  - `submitted-blogs/`: User submissions management
- `src/components/`: Reusable React components (Header, Footer, etc.)
- `src/services/`: Supabase service functions for data fetching
- `src/types/`: TypeScript type definitions
- `src/utils/supabase/`: Supabase client configurations
- `supabase/`: Supabase configuration and local setup
- `public/`: Static assets

## Configuration
- **Environment Variables**: Set up Supabase URL and anon key in `.env.local`
- **Supabase Setup**: Ensure Supabase is running locally or connected to a remote instance
- **Database Schema**: TODO - Define and document the database schema (tables for blogs, users, comments, etc.)

## Scripts
- `npm run dev`: Start the development server with Turbopack
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint for code linting

## Deployment
Deploy to Vercel for easy Next.js hosting:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

For other platforms, build the app with `npm run build` and serve the `.next` folder.

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License
This project is licensed under the MIT License. See the LICENSE file for details (create one if not present).