import Image from "next/image";

export function Header() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <Image
                src="/gst_icon.ico"
                className="logo"
                width={50}
                height={50}
                alt="icon of header"
            />
            <div>HI</div>
        </div>
    )
}
