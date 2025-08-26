export default function Footer() {
  return (
    <footer className="bg-gray-300 border-t py-6 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 text-center text-gray-900 mb-4">
          <div className="flex flex-col items-start gap-4">
            <a href="/">About Us</a>
            <a href="/">Getting Here</a>
            <a href="/">FAQs</a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a href="/">Places to Stay</a>
            <a href="/">Things to Do</a>
            <a href="/">Events Calendar</a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a href="/">Restaurants</a>
            <a href="/">Nightlife</a>
            <a href="/">Shopping</a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a href="/">Plan Your Trip</a>
            <a href="/">Contact Us</a>
            <a href="/">Newsletter Signup</a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-2">
          2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
