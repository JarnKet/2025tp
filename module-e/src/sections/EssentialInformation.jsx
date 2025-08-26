import { ReadItLoudButton } from "../components/Buttons";

export default function EssentialInformation() {
  const contact = "04 72 10 30 30";
  const address = "Mairie de Lyon, 69205 Lyon cedex 01";
  return (
    <section id="essential-information" className="w-full h-screen space-y-8">
      <h2 className="text-4xl font-bold text-center mt-20">
        Essential Information
      </h2>
      <div className="space-y-2 font-semibold">
        <p>Contact: {contact}</p>
        <p>Address: {address}</p>
      </div>
      <ReadItLoudButton
        text={
          "contact: 04 72 10 30 30, Address: Mairie de Lyon, 69205 Lyon cedex 01"
        }
      />
    </section>
  );
}
