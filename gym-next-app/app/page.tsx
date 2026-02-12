import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Testing Padding & Margin */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--bg-page)] to-[var(--bg-card)]">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--text-primary)] leading-tight">
            Welcome to Fitnezz
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl">
            Your premium fitness journey starts here. Transform your body, elevate your mind.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Test Section - Demonstrating Margins & Padding Work */}
      <section className="py-12 px-4 bg-[var(--bg-card)]">
        <div className="container">
          <div className="p-8 mb-8 bg-[var(--bg-page)] rounded-lg border-2 border-[var(--brand-red)]">
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
              ✅ Padding & Margin Test
            </h2>
            <p className="mb-4 text-[var(--text-secondary)]">
              This box has <strong>padding: 2rem (p-8)</strong> and <strong>margin-bottom: 2rem (mb-8)</strong>
            </p>
            <div className="mt-4 p-4 bg-[var(--brand-red)] text-white rounded">
              <p className="m-0">Inner box with padding-4 (p-4) and margin-top-4 (mt-4)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[var(--bg-page)] rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Box 1</h3>
              <p className="text-[var(--text-secondary)]">Padding: 1.5rem (p-6)</p>
              <p className="mt-2 text-[var(--text-secondary)]">Margin-top: 0.5rem (mt-2)</p>
            </div>
            <div className="p-6 bg-[var(--bg-page)] rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Box 2</h3>
              <p className="text-[var(--text-secondary)]">Gap between boxes: 1.5rem (gap-6)</p>
            </div>
            <div className="p-6 bg-[var(--bg-page)] rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Box 3</h3>
              <p className="text-[var(--text-secondary)]">All spacing works! 🎉</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[var(--text-primary)]">
            Why Choose Fitnezz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)] hover:border-[var(--brand-red)]">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                Expert Trainers
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Work with certified professionals who understand your goals
              </p>
            </div>
            <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)] hover:border-[var(--brand-red)]">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                Modern Equipment
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Access to state-of-the-art fitness equipment
              </p>
            </div>
            <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)] hover:border-[var(--brand-red)]">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                Flexible Plans
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Choose from various membership options that fit your lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
