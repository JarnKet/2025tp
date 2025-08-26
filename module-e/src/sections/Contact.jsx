export default function Contact() {
  return (
    <section id="contact" className="cs-container">
      <form className="grid grid-cols-2 gap-4 relative border-2 border-solid border-[#333] px-4 pb-8 pt-24">
        <h2 className="bg-white absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center border border-solid border-[#333] px-4 py-2">
          Contact
        </h2>

        {/* First name */}
        <div className="space-x-4">
          <label htmlFor="fname">First name</label>
          <input
            id="fname"
            className="border border-solid border-black"
            type="text"
            placeholder="first name"
          />
        </div>

        {/* Last name */}
        <div className="space-x-4">
          <label htmlFor="lname">Last name</label>
          <input
            id="lname"
            className="border border-solid border-black"
            type="text"
            placeholder="last name"
          />
        </div>

        {/* Email name */}
        <div className="space-x-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="border border-solid border-black"
            type="email"
            placeholder="email"
          />
        </div>

        {/* Email name */}
        <div className="space-x-4">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="border border-solid border-black"
            type="phone"
            placeholder="phone"
          />
        </div>
      </form>
    </section>
  );
}
