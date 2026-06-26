import ContactHeader from '@/components/organisms/ContactHeader';
import ContactInfoAndForm from '@/components/organisms/ContactInfoAndForm';
import ContactMapAndCraftsmanship from '@/components/organisms/ContactMapAndCraftsmanship';

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-background-light)] min-h-screen">
      <ContactHeader />
      <ContactInfoAndForm />
      <ContactMapAndCraftsmanship />
    </div>
  );
}
