# Keep Austin Weird AI Generator 🌮🎸

A fun, Austin-themed web app that generates the most Austin things ever with one click! Get AI-generated band names, startup pitches, taco recipes, and protest signs that capture the weird and wonderful spirit of Austin, Texas.

## Features

- 🎸 **Band Name Generator**: Get weird and wonderful Austin-themed band names
- 🚀 **Startup Pitch Generator**: Generate quintessentially Austin tech startup ideas
- 🌮 **Taco Recipe Generator**: Create creative Austin-inspired taco recipes
- 📢 **Protest Sign Generator**: Generate Austin-weird protest slogans
- ✨ **Beautiful UI**: Austin-themed design with gradients, animations, and Austin vibes
- 🎨 **Responsive Design**: Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd keep-austin-weird-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Get your OpenAI API key from [OpenAI's platform](https://platform.openai.com/api-keys).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action!

## Usage

1. Click the "Generate Austin Weirdness" button
2. Wait for the AI to create your Austin-themed content
3. Enjoy your generated band name, startup pitch, taco recipe, and protest sign!
4. Click again to generate new content

## Project Structure

```
keep-austin-weird-app/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # OpenAI API integration
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main app component
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Customization

### Adding New Content Types

To add new Austin-themed content types:

1. Update the `GeneratedContent` interface in `app/page.tsx`
2. Add the new content type to the OpenAI prompt in `app/api/generate/route.ts`
3. Create a new card component in the UI

### Styling

The app uses Tailwind CSS with custom Austin-themed animations. You can modify:

- Colors in the gradient backgrounds
- Animation timings in `app/globals.css`
- Card layouts and spacing

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the "Keep Austin Weird" movement
- Built with love for the Austin community
- Powered by OpenAI's GPT-4
- Icons by Lucide React

---

Made with ❤️ and 🌮 in Austin, Texas! 🤠
