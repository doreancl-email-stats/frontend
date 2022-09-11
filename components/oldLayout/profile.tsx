import Image from 'next/image';
import Link from 'next/link';

export function Profile() {
  return (
    <div className="relative">
      <Link href={'/protected'} passHref>
        <button className="relative z-10 block h-8 w-8 overflow-hidden rounded-full shadow focus:outline-none">
          <Image
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar"
            width={296}
            height={296}
          />
        </button>
      </Link>
    </div>
  );
}
