import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-center items-center">
            <div className="relative w-32 h-12">
                <Image
                    src="/reparent-logo.png"
                    alt="Reparent Logo"
                    fill
                    className="object-contain"
                    priority
                />
               

            </div>
        </header>
    );
}
