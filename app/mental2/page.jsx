import Link from "next/link";

export default function MentalHealthSupport() {
  const contacts = [
    {
      country: "United States",
      hotline: "988",
      email: "help@mentalhealth.gov",
      website: "https://988lifeline.org/",
    },
    {
      country: "United Kingdom",
      hotline: "116 123",
      email: "jo@samaritans.org",
      website: "https://www.samaritans.org/",
    },
    {
      country: "Canada",
      hotline: "1-833-456-4566",
      email: "support@talksuicide.ca",
      website: "https://talksuicide.ca/",
    },
    {
      country: "India",
      hotline: "9152987821",
      email: "vandrevala@vandrevalafoundation.com",
      website: "https://www.vandrevalafoundation.com/",
    },
    {
      country: "Australia",
      hotline: "13 11 14",
      email: "info@lifeline.org.au",
      website: "https://www.lifeline.org.au/",
    },
    {
      country: "South Africa",
      hotline: "0800 567 567",
      email: "help@sadag.org",
      website: "https://www.sadag.org/",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🚨 Mental Health Emergency Contacts</h1>
      <p className="text-center text-gray-600 mb-8">
        If you're struggling, please reach out to a mental health professional. Here are some helplines that offer support.
      </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {contacts.map((contact, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-black">{contact.country}</h2>
            <p className="mt-2 text-gray-700">
              📞 Hotline:{" "}
              <a href={`tel:${contact.hotline}`} className="text-blue-500 hover:underline">
                {contact.hotline}
              </a>
            </p>
            <p className="mt-2 text-gray-700">
              📧 Email:{" "}
              <a href={`mailto:${contact.email}`} className="text-blue-500 hover:underline">
                {contact.email}
              </a>
            </p>
            <p className="mt-2">
              🌐 <Link href={contact.website} target="_blank" className="text-blue-500 hover:underline">
                Visit Website
              </Link>
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-8">
        If you or someone you know is in immediate danger, please call local emergency services 🚑.
      </p>
    </div>
  );
}
