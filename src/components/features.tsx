const features = [
  {
    name: 'TypeScript Ready',
    description: 'Built with TypeScript for better development experience and type safety.',
    icon: '🔷',
  },
  {
    name: 'Tailwind CSS',
    description: 'Modern utility-first CSS framework for rapid UI development.',
    icon: '🎨',
  },
  {
    name: 'App Router',
    description: 'Next.js 13+ App Router with server components and streaming.',
    icon: '⚡',
  },
  {
    name: 'Dark Mode',
    description: 'Built-in dark mode support with system preference detection.',
    icon: '🌙',
  },
  {
    name: 'ESLint',
    description: 'Code quality and consistency with ESLint configuration.',
    icon: '✅',
  },
  {
    name: 'Production Ready',
    description: 'Optimized for performance and ready for deployment.',
    icon: '🚀',
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to build modern web applications
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            This template includes all the tools and configurations you need to start building
            production-ready applications with Next.js.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <span className="text-2xl" role="img" aria-label={feature.name}>
                    {feature.icon}
                  </span>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
