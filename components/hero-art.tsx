"use client"

interface HeroArtProps {
  className?: string
}

export function AcademyArt({ className }: HeroArtProps) {
  return (
    <svg
      viewBox="0 0 640 640"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="320" cy="330" r="300" strokeWidth="1" opacity="0.05" />
      <circle cx="320" cy="330" r="252" strokeWidth="1" opacity="0.07" />
      <circle cx="320" cy="330" r="204" strokeWidth="1" opacity="0.09" />

      <polygon points="320,145 462.9,222.5 462.9,397.5 320,475 177.1,397.5 177.1,222.5" strokeWidth="1.5" opacity="0.35" />
      <polygon points="320,172 439.5,241 439.5,379 320,448 200.5,379 200.5,241" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.25" />

      <g strokeWidth="1" opacity="0.5">
        <polygon points="150,197 161.3,203.5 161.3,216.5 150,223 138.7,216.5 138.7,203.5" />
        <polygon points="488,164 497.5,169.5 497.5,180.5 488,186 478.5,180.5 478.5,169.5" />
        <polygon points="126,321 133.8,325 133.8,335 126,339 118.2,335 118.2,325" />
        <polygon points="516,351 523.8,355 523.8,365 516,369 508.2,365 508.2,355" />
      </g>

      <g fill="currentColor">
        <circle cx="161.3" cy="216.5" r="3" opacity="0.4" />
        <circle cx="488" cy="186" r="3" opacity="0.4" />
        <circle cx="133.8" cy="325" r="2.5" opacity="0.35" />
        <circle cx="516" cy="369" r="2.5" opacity="0.35" />
        <circle cx="180" cy="140" r="2.5" opacity="0.3" />
        <circle cx="462" cy="120" r="2.5" opacity="0.3" />
        <circle cx="250" cy="520" r="3" opacity="0.35" />
        <circle cx="420" cy="518" r="2.5" opacity="0.3" />
      </g>

      <g strokeWidth="1.5" opacity="0.8">
        <path d="M320,120 L352,136 L320,152 L288,136 Z" />
      </g>
      <circle cx="320" cy="152" r="3" fill="currentColor" opacity="0.6" />
      <polygon points="320,94 328.7,99 328.7,109 320,114 311.3,109 311.3,99" strokeWidth="1" opacity="0.5" />

      <polygon points="320,254 359.8,277 359.8,323 320,346 280.2,323 280.2,277" strokeWidth="2" opacity="0.95" />
      <g strokeWidth="1.6" opacity="0.75">
        <path d="M359.8,323 L392,352 L424,344" />
        <path d="M392,352 L394,384" />
        <path d="M280.2,323 L248,352 L248,322" />
        <path d="M280.2,277 L246,260" />
        <path d="M320,254 L320,222" />
        <polygon points="320,196 330.4,202 330.4,214 320,220 309.6,214 309.6,202" strokeWidth="1" opacity="0.6" />
      </g>
      <g fill="currentColor">
        <circle cx="424" cy="344" r="8" opacity="0.85" />
        <circle cx="394" cy="384" r="6" opacity="0.65" />
        <circle cx="248" cy="322" r="7" opacity="0.8" />
        <circle cx="246" cy="260" r="8" opacity="0.8" />
        <circle cx="320" cy="222" r="5" opacity="0.6" />
        <circle cx="320" cy="300" r="4" opacity="0.5" />
      </g>

      <path
        d="M150,490 L175,490 C185,490 190,474 198,466 L214,480 C220,486 226,470 234,464 L250,484 C256,490 262,472 270,466 L286,482 C292,488 300,470 308,466 L324,482 C330,488 338,472 346,468 L362,482 C368,488 376,474 384,470 L400,482 C406,488 416,476 426,472 L448,484 C458,488 470,484 480,484 L500,484"
        strokeWidth="2"
        opacity="0.9"
      />
      <path d="M150,508 L500,508" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

export function AppstoreArt({ className }: HeroArtProps) {
  return (
    <svg
      viewBox="0 0 640 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="320" cy="300" r="280" strokeWidth="1" opacity="0.05" />
      <circle cx="320" cy="300" r="232" strokeWidth="1" opacity="0.07" />
      <circle cx="320" cy="300" r="184" strokeWidth="1" opacity="0.09" />

      <polygon points="320,75 471.6,162.5 471.6,337.5 320,425 168.4,337.5 168.4,162.5" strokeWidth="1.5" opacity="0.35" />
      <polygon points="320,105 445.6,177.5 445.6,322.5 320,395 194.4,322.5 194.4,177.5" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.22" />

      <g strokeWidth="1" opacity="0.5">
        <polygon points="170,220 178.4,224 178.4,234 170,238 161.6,234 161.6,224" />
        <polygon points="478,240 486.4,244 486.4,254 478,258 469.6,254 469.6,244" />
        <polygon points="180,390 186,393.2 186,400 180,403.2 174,400 174,393.2" />
        <polygon points="470,380 476,383.2 476,390 470,393.2 464,390 464,383.2" />
      </g>

      <g fill="currentColor">
        <circle cx="170" cy="238" r="2.5" opacity="0.4" />
        <circle cx="478" cy="258" r="2.5" opacity="0.4" />
        <circle cx="180" cy="403.2" r="2" opacity="0.35" />
        <circle cx="470" cy="393.2" r="2" opacity="0.35" />
        <circle cx="220" cy="100" r="2.5" opacity="0.3" />
        <circle cx="430" cy="110" r="2.5" opacity="0.3" />
      </g>

      <g strokeWidth="1.2" opacity="0.7">
        <rect x="215" y="132" width="66" height="66" rx="14" />
        <rect x="287" y="132" width="66" height="66" rx="14" />
        <rect x="359" y="132" width="66" height="66" rx="14" />
        <rect x="215" y="220" width="66" height="66" rx="14" />
        <rect x="287" y="220" width="66" height="66" rx="14" />
        <rect x="359" y="220" width="66" height="66" rx="14" />
      </g>

      <polygon points="248,152 259.3,158.5 259.3,171.5 248,178 236.7,171.5 236.7,158.5" strokeWidth="1.2" opacity="0.7" />
      <path d="M302,165 L308,165 L314,150 L322,180 L328,160 L334,164 L340,164" strokeWidth="1.2" opacity="0.7" />
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M382,156 L382,174" />
        <path d="M392,148 L392,174" />
        <path d="M402,162 L402,174" />
        <path d="M378,176 L406,176" opacity="0.5" />
      </g>
      <path d="M238,242 L258,253 L238,264 Z" fill="currentColor" opacity="0.35" strokeWidth="0" />
      <g strokeWidth="1.4" opacity="0.8">
        <path d="M320,240 L320,264" />
        <path d="M310,256 L320,266 L330,256" />
        <path d="M306,270 L334,270" opacity="0.6" />
      </g>
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M380,240 L404,240 L404,264 L392,276 L380,264 Z" />
      </g>
      <circle cx="392" cy="254" r="2.5" fill="currentColor" opacity="0.5" />

      <g strokeWidth="2" opacity="0.9">
        <path d="M320,430 L320,462" />
      </g>
      <path d="M306,450 L320,464 L334,450" strokeWidth="1.8" opacity="0.9" />
      <path d="M284,478 L356,478 L346,496 L294,496 Z" strokeWidth="1.5" opacity="0.4" />
      <g fill="currentColor">
        <circle cx="240" cy="487" r="3" opacity="0.4" />
        <circle cx="258" cy="487" r="3" opacity="0.4" />
        <circle cx="276" cy="487" r="3" opacity="0.4" />
      </g>

      <g strokeWidth="1.5" opacity="0.6">
        <path d="M492,136 L492,98" />
        <path d="M480,110 L492,96 L504,110" />
        <path d="M480,136 L504,136" opacity="0.4" />
      </g>

      <path d="M150,114 L153.5,124.2 L164.1,124.2 L155.3,130.8 L158.8,141 L150,134.4 L141.2,141 L144.7,130.8 L135.9,124.2 L146.5,124.2 Z" strokeWidth="1.2" opacity="0.7" />

      <path d="M118,492 L138,492 L138,510 L128,522 L118,510 Z" strokeWidth="1.2" opacity="0.5" />
      <circle cx="128" cy="503" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
