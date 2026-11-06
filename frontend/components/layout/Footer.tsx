import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Join Green Reward" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "#", label: "Help/FAQ" },
      { href: "#", label: "Contact us" },
      { href: "/#gallery", label: "Our Gallery" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/estimation-calculator", label: "Paint Calculator" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
];

const svgClass = "h-[16px] w-[16px] fill-current";

const LinkedInIcon = () => (
  <svg className={svgClass} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.16551 15.0417H1.14314V5.30866H4.16551V15.0417ZM2.6527 3.98098C1.68625 3.98098 0.902344 3.18047 0.902344 2.214C0.902344 1.2473 1.686 0.463623 2.6527 0.463623C3.61939 0.463623 4.40305 1.2473 4.40305 2.214C4.40305 3.18047 3.61883 3.98098 2.6527 3.98098ZM15.4773 15.0417H12.4614V10.3037C12.4614 9.17453 12.4386 7.72645 10.89 7.72645C9.31863 7.72645 9.07783 8.95325 9.07783 10.2224V15.0417H6.05872V5.30866H8.95743V6.63633H8.99973C9.40323 5.87162 10.3889 5.0646 11.8594 5.0646C14.9182 5.0646 15.4805 7.07889 15.4805 9.69519V15.0417H15.4773Z"/></svg>
);
const InstagramIcon = () => (
  <svg className={svgClass} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><path d="M9.80872 0.724121H4.20916C1.93345 0.724121 0.0820312 2.57554 0.0820312 4.85125V10.4508C0.0820312 12.7265 1.93345 14.5779 4.20916 14.5779H9.80872C12.0844 14.5779 13.9358 12.7265 13.9358 10.4508V4.85125C13.9358 2.57554 12.0844 0.724121 9.80872 0.724121ZM12.5421 10.4508C12.5421 11.9604 11.3183 13.1842 9.80872 13.1842H4.20916C2.69954 13.1842 1.47572 11.9604 1.47572 10.4508V4.85125C1.47572 3.3416 2.69954 2.11781 4.20916 2.11781H9.80872C11.3183 2.11781 12.5421 3.3416 12.5421 4.85125V10.4508Z"/><path d="M7.01082 4.06775C5.0351 4.06775 3.42773 5.67512 3.42773 7.65081C3.42773 9.62651 5.0351 11.2339 7.01082 11.2339C8.98654 11.2339 10.5939 9.62653 10.5939 7.65081C10.5939 5.67509 8.98654 4.06775 7.01082 4.06775ZM7.01082 9.84023C5.80164 9.84023 4.82143 8.86002 4.82143 7.65084C4.82143 6.44166 5.80167 5.46144 7.01082 5.46144C8.22 5.46144 9.20022 6.44166 9.20022 7.65084C9.20022 8.85999 8.21998 9.84023 7.01082 9.84023Z"/><path d="M10.6001 4.95408C11.0744 4.95408 11.459 4.56955 11.459 4.09521C11.459 3.62086 11.0744 3.23633 10.6001 3.23633C10.1257 3.23633 9.74121 3.62086 9.74121 4.09521C9.74121 4.56955 10.1257 4.95408 10.6001 4.95408Z"/></svg>
);
const FacebookIcon = () => (
  <svg className={svgClass} viewBox="0 0 9 17" xmlns="http://www.w3.org/2000/svg"><path d="M8.32574 9.64734L8.75796 6.76228H6.05556V4.89007C6.05556 4.10078 6.43307 3.33141 7.64338 3.33141H8.87193V0.875087C8.87193 0.875087 7.75706 0.680176 6.69112 0.680176C4.46562 0.680176 3.01093 2.06199 3.01093 4.56346V6.76228H0.537109V9.64734H3.01093V16.6218H6.05556V9.64734H8.32574Z"/></svg>
);
const TwitterIcon = () => (
  <svg className={svgClass} viewBox="0 0 17 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M15.9045 0.796392C15.2762 1.23956 14.5806 1.57851 13.8444 1.80019C13.4492 1.34587 12.9241 1.02385 12.34 0.877698C11.7559 0.731546 11.141 0.768309 10.5785 0.983016C10.0159 1.19772 9.5329 1.58001 9.19472 2.07819C8.85653 2.57636 8.67951 3.16637 8.68758 3.76843V4.42451C7.53461 4.45441 6.39214 4.1987 5.36192 3.68015C4.3317 3.16161 3.44571 2.39633 2.78286 1.45247C2.78286 1.45247 0.158544 7.35719 6.06326 9.98151C4.71208 10.8987 3.10248 11.3586 1.4707 11.2937C7.37542 14.5741 14.5923 11.2937 14.5923 3.74875C14.5917 3.566 14.5741 3.3837 14.5398 3.2042C15.2094 2.54386 15.6819 1.71012 15.9045 0.796392Z"/></svg>
);
const YoutubeIcon = () => (
  <svg className={svgClass} viewBox="0 0 17 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M15.8135 2.39721C15.7346 2.08198 15.5739 1.79315 15.3477 1.5599C15.1214 1.32664 14.8376 1.15723 14.525 1.06877C13.3825 0.789795 8.81266 0.789795 8.81266 0.789795C8.81266 0.789795 4.24283 0.789795 3.10037 1.09534C2.78768 1.1838 2.50388 1.35321 2.27763 1.58646C2.05138 1.81972 1.89068 2.10854 1.81178 2.42378C1.60269 3.58321 1.50042 4.75938 1.50624 5.9375C1.49879 7.12449 1.60107 8.30963 1.81178 9.47779C1.89877 9.78323 2.06306 10.0611 2.28879 10.2845C2.51451 10.5079 2.79404 10.6693 3.10037 10.7531C4.24283 11.0586 8.81266 11.0586 8.81266 11.0586C8.81266 11.0586 13.3825 11.0586 14.525 10.7531C14.8376 10.6646 15.1214 10.4952 15.3477 10.262C15.5739 10.0287 15.7346 9.73989 15.8135 9.42466C16.021 8.27395 16.1233 7.10675 16.1191 5.9375C16.1265 4.75051 16.0243 3.56537 15.8135 2.39721Z"/><path d="M7.31816 8.1095L11.1374 5.9375L7.31816 3.7655V8.1095Z"/></svg>
);

const socials = [
  { href: "https://www.linkedin.com/company/qualitas-eco-paints/", Icon: LinkedInIcon },
  { href: "https://www.instagram.com/qualitas_eco_paint", Icon: InstagramIcon },
  { href: "https://www.facebook.com/qualitasecopaints", Icon: FacebookIcon },
  { href: "#", Icon: TwitterIcon },
  { href: "#", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0B4DC4] text-white">
      <div className="mx-auto max-w-[1100px] px-6 py-10 md:px-8 md:py-16">
        
        <div className="flex flex-col items-center text-center gap-10 md:flex-row md:items-start md:justify-between md:gap-8 md:text-left">
          
          {/* Logo Section */}
          <div className="shrink-0 pt-1">
            <Link href="/">
              <img 
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo/quali 1.svg`} 
                alt="Qualitas Eco Paints Logo" 
                className="h-[40px] md:h-[60px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16 lg:gap-24 md:ml-auto">
            {columns.map(col => (
              <div key={col.title} className="flex flex-col items-center md:items-start">
                <h4 className="mb-3 md:mb-4 font-nexa text-[16px] md:text-[18px] font-bold text-white">{col.title}</h4>
                <ul className="flex flex-col items-center md:items-start gap-2 md:gap-3">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link 
                        href={l.href} 
                        className="font-nexa text-[13px] md:text-[14px] font-light text-white/90 transition hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  
                  {/* Social Icons under "More" column */}
                  {col.title === "More" && (
                    <div className="flex items-center gap-4 pt-3 justify-center md:justify-start">
                      {socials.map(({ href, Icon }, i) => (
                        <a 
                          key={i} 
                          href={href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white transition hover:-translate-y-1 hover:text-brand-yellow"
                        >
                          <Icon />
                        </a>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 md:my-12 border-t border-white/20" />

        {/* Bottom Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 md:gap-4 text-[12px] md:text-[15px] font-nexa font-light text-white/80 md:flex-row text-center md:text-left">
          <p>Copyright, Qualitas Eco Paint 2024. All rights reserved.</p>
          <Link href="#" className="transition hover:text-white">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}