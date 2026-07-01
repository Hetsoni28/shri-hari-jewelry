import ContactHeader from '@/components/organisms/ContactHeader';
import ContactInfoAndForm from '@/components/organisms/ContactInfoAndForm';
import ContactMapAndCraftsmanship from '@/components/organisms/ContactMapAndCraftsmanship';

export const dynamic = 'force-dynamic'; // Server-rendered on every request

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-background-light)] min-h-screen">
      <ContactHeader />
      <ContactInfoAndForm />
      <ContactMapAndCraftsmanship />
    </div>
  );
}
