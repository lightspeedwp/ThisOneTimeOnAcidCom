import clsx from "clsx";
import svgPaths from "./svg-4yh2yte1xb";
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return (
    <div className={clsx("relative rounded-[16px] shrink-0 size-[32px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[38.398px] relative shrink-0 w-full">
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 whitespace-nowrap">{children}</p>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return <BackgroundImage5 additionalClassNames={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>{children}</BackgroundImage5>;
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return <BackgroundImage5 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage5>;
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function IconBaseBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="IconBase">{children}</g>
    </BackgroundImage1>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage2>
      <g id="Icon">{children}</g>
    </BackgroundImage2>
  );
}
type LinkBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LinkBackgroundImageAndText({ text, additionalClassNames = "" }: LinkBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute border-[#e5e5e5] border-b border-solid h-[39.398px]", additionalClassNames)}>
      <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[60.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}

function IconBackgroundImage5() {
  return (
    <BackgroundImage>
      <path d={svgPaths.p3869cc00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
      <path d={svgPaths.p329f880} fill="var(--fill-0, #A3A3A3)" id="Vector_2" />
    </BackgroundImage>
  );
}

function IconBackgroundImage4() {
  return (
    <BackgroundImage>
      <path d={svgPaths.p532d600} fill="var(--fill-0, #A3A3A3)" id="Vector" />
    </BackgroundImage>
  );
}

function IconBackgroundImage3() {
  return (
    <BackgroundImage2>
      <g clipPath="url(#clip0_4159_894)" id="Icon">
        <path d={svgPaths.p7d0ab00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_4159_894">
          <rect fill="white" height="18" width="18" />
        </clipPath>
      </defs>
    </BackgroundImage2>
  );
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage2>
      <g clipPath="url(#clip0_4159_911)" id="Icon">
        <path d={svgPaths.p1f524b00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_4159_911">
          <rect fill="white" height="18" width="18" />
        </clipPath>
      </defs>
    </BackgroundImage2>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage2>
      <g clipPath="url(#clip0_4159_908)" id="Icon">
        <path d={svgPaths.p38127b00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_4159_908">
          <rect fill="white" height="18" width="18" />
        </clipPath>
      </defs>
    </BackgroundImage2>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage2>
      <g clipPath="url(#clip0_4159_900)" id="Icon">
        <path d={svgPaths.p3eb94a70} fill="var(--fill-0, #A3A3A3)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_4159_900">
          <rect fill="white" height="18" width="18" />
        </clipPath>
      </defs>
    </BackgroundImage2>
  );
}
type ButtonBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText2({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText2Props) {
  return (
    <div className={clsx("absolute h-[25.594px] left-0 top-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText1({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText1Props) {
  return (
    <div style={{ backgroundImage: "linear-gradient(162.498deg, rgb(255, 16, 240) 0%, rgb(190, 0, 254) 100%)" }} className={clsx("absolute content-stretch flex h-[59.594px] items-center justify-center px-[33px] py-[17px] rounded-[4px] top-0 w-[188.984px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#d4008c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,16,240,0.3),0px_0px_15px_0px_rgba(255,16,240,0.2)]" />
      <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return (
    <div className="absolute h-[46.398px] left-[32px] top-[198.39px] w-[292.336px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#d4008c] text-[14px] top-[24.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[19.195px] left-[32px] top-[32px] w-[292.336px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#f4ff3c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <BackgroundImage5 additionalClassNames={clsx("h-[19.195px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#f4ff3c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return <BackgroundImage6>{text}</BackgroundImage6>;
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <BackgroundImage5 additionalClassNames={clsx("h-[38.398px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[59.594px] items-center justify-center px-[33px] py-[17px] rounded-[4px] top-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(244,255,60,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[#f6f2eb] text-[16px] text-center whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[19.195px] left-0 top-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#ff10f0] text-[12px] top-0 tracking-[2px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function ThisOneTimeOnAcid() {
  return (
    <div className="bg-[#0f0f0f] content-stretch flex flex-col items-start relative size-full" data-name="This One Time on Acid">
      <div className="h-[862px] overflow-clip relative shrink-0 w-full" data-name="Body">
        <div className="absolute h-[6601.656px] left-0 top-0 w-[1171px]" data-name="RootLayout">
          <div className="absolute content-stretch flex flex-col h-[5869.102px] items-start left-0 top-[108.59px] w-[1171px]" data-name="BookHomePage">
            <div className="bg-[#0f0f0f] h-[881.813px] relative shrink-0 w-[1171px]" data-name="Section">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[24px] relative size-full">
                <BackgroundImage4 additionalClassNames="h-[641.813px]">
                  <div className="absolute h-[604.727px] left-0 top-[18.54px] w-[577.633px]" data-name="Container">
                    <TextBackgroundImageAndText text="First book by Ash Shaw" additionalClassNames="w-[577.633px]" />
                    <div className="absolute h-[154.563px] left-0 top-[35.2px] w-[577.633px]" data-name="Heading 1">
                      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[77.286px] left-0 not-italic text-[70.26px] text-white top-0 w-[528px]">This one time on acid...</p>
                    </div>
                    <div className="absolute h-[105.398px] left-0 top-[213.76px] w-[577.633px]" data-name="Heading 2">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[35.13px] left-0 not-italic text-[#cfc7bb] text-[23.42px] top-[0.5px] w-[534px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                    </div>
                    <div className="absolute h-[51.188px] left-0 top-[343.16px] w-[577.633px]" data-name="Paragraph">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[556px]">For misfits, makers, dancers, seekers, festival people, and anyone wired a little differently.</p>
                    </div>
                    <div className="absolute content-stretch flex gap-[16px] h-[59.594px] items-end left-0 top-[426.34px] w-[500px]" data-name="Form">
                      <div className="flex-[295.016_0_0] h-[59.594px] min-h-px min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                          <div className="bg-[rgba(15,15,15,0.6)] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[295.016px]" data-name="Email Input">
                            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-[16px] relative size-full">
                                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9c9488] text-[16px] whitespace-nowrap">Email address</p>
                              </div>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                          </div>
                        </div>
                      </div>
                      <div className="h-[59.594px] relative rounded-[4px] shrink-0 w-[188.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.498deg, rgb(255, 16, 240) 0%, rgb(190, 0, 254) 100%)" }}>
                        <div aria-hidden="true" className="absolute border border-[#d4008c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,16,240,0.3),0px_0px_15px_0px_rgba(255,16,240,0.2)]" />
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[33px] py-[17px] relative size-full">
                          <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute h-[19.195px] left-0 top-[501.94px] w-[577.633px]" data-name="Paragraph">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#cfc7bb] text-[12px] top-0 whitespace-nowrap">Enter your email to read the rough draft, get chapter updates, and hear first when pre-orders open.</p>
                    </div>
                    <div className="absolute h-[59.594px] left-0 top-[545.13px] w-[577.633px]" data-name="Container">
                      <ButtonBackgroundImageAndText text="Join the Waitlist" additionalClassNames="left-0 w-[184.383px]" />
                    </div>
                  </div>
                  <div className="absolute h-[641.813px] left-[641.63px] rounded-[8px] top-0 w-[481.359px]" data-name="Container" style={{ backgroundImage: "linear-gradient(126.87deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                    <div className="content-stretch flex flex-col gap-[56.784px] items-center justify-center overflow-clip pb-[220.109px] pt-[212.894px] px-px relative rounded-[inherit] size-full">
                      <div className="flex h-[120.419px] items-center justify-center relative shrink-0 w-[418.447px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "57" } as React.CSSProperties}>
                        <div className="-rotate-2 flex-none">
                          <BackgroundImage5 additionalClassNames="h-[106px] relative w-[415px]">
                            <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[52.8px] left-[209.15px] not-italic text-[48px] text-center text-white top-[-13.33px] whitespace-nowrap">{`This one time on `}</p>
                            <div className="absolute content-stretch flex h-[63.268px] items-start left-[141.05px] shadow-[0px_0px_24px_0px_rgba(255,16,240,0.4)] top-[49px] w-[96.724px]" data-name="Text">
                              <p className="bg-clip-text font-['Righteous:Regular',sans-serif] leading-[52.8px] not-italic relative shrink-0 text-[48px] text-[transparent] text-center whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(255, 16, 240) 0%, rgb(244, 255, 60) 50%, rgb(0, 212, 255) 100%)" }}>
                                acid
                              </p>
                            </div>
                            <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[52.8px] left-[255.83px] not-italic text-[48px] text-center text-white top-[50.71px] whitespace-nowrap">...</p>
                          </BackgroundImage5>
                        </div>
                      </div>
                      <BackgroundImage3 additionalClassNames="h-[32px] w-[176.297px]">
                        <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[88.5px] not-italic text-[#cfc7bb] text-[20px] text-center top-[0.5px] tracking-[4px] uppercase whitespace-nowrap">by Ash Shaw</p>
                      </BackgroundImage3>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_20px_50px_0px_rgba(0,0,0,0.5),0px_0px_30px_0px_rgba(255,16,240,0.4)]" />
                  </div>
                </BackgroundImage4>
              </div>
            </div>
            <BackgroundImage3 additionalClassNames="bg-[#0f0f0f] h-[539.586px] w-[1171px]">
              <div className="absolute h-[19.195px] left-[185.5px] top-[96px] w-[800px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.09px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">What it is</p>
              </div>
              <div className="absolute h-[112.422px] left-[185.5px] top-[131.2px] w-[800px]" data-name="Heading 2">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.21px] not-italic text-[46.84px] text-center text-white top-0 w-[784px]">A memoir. A guide. A neon map back to yourself.</p>
              </div>
              <div className="absolute h-[76.781px] left-[185.5px] top-[267.62px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.19px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[787px]">This one time on acid... is a hybrid memoir and creative-life guide built from a life lived across dancefloors, cities, bicycles, studios, festivals, businesses, and strange turning points. It brings together wild stories, subculture, identity, art, and lived lessons into one vivid body of work.</p>
              </div>
              <div className="absolute h-[51.188px] left-[185.5px] top-[368.4px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.11px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[794px]">This is not a polished success story. It is a raw, evolving book about becoming more visible, more honest, more creative, and more fully yourself.</p>
              </div>
            </BackgroundImage3>
            <BackgroundImage3 additionalClassNames="bg-[#0f0f0f] h-[513.992px] w-[1171px]">
              <div className="absolute h-[19.195px] left-[185.5px] top-[96px] w-[800px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.48px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Why care</p>
              </div>
              <div className="absolute h-[112.422px] left-[185.5px] top-[131.2px] w-[800px]" data-name="Heading 2">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.23px] not-italic text-[46.84px] text-center text-white top-0 w-[761px]">Because the point is not just to survive your life. It is to live it fully.</p>
              </div>
              <div className="absolute h-[51.188px] left-[185.5px] top-[267.62px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.48px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[783px]">Beneath the stories of psytrance culture, travel, UV paint, and creative reinvention is a deeper question: how do you build a life that actually feels like yours?</p>
              </div>
              <div className="absolute h-[51.188px] left-[185.5px] top-[342.8px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.3px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[797px]">This book is for people who want more aliveness, more freedom, more belonging, and more permission to become who they already are.</p>
              </div>
            </BackgroundImage3>
            <BackgroundImage3 additionalClassNames="bg-[#0f0f0f] h-[658.359px] w-[1171px]">
              <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[221.18px] items-start left-[24px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[96px] w-[358.328px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <HeadingBackgroundImageAndText text="Stories" additionalClassNames="w-[292.328px]" />
                <BackgroundImage3 additionalClassNames="h-[51.188px] w-[292.328px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[251px]">Raw scenes from festivals, cities, movement, art, risk, and identity.</p>
                </BackgroundImage3>
              </div>
              <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[221.18px] items-start left-[406.33px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[96px] w-[358.336px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <HeadingBackgroundImageAndText text="Lessons" additionalClassNames="w-[292.336px]" />
                <BackgroundImage3 additionalClassNames="h-[76.781px] w-[292.336px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[260px]">Hard-won insights on freedom, visibility, creativity, belonging, and courage.</p>
                </BackgroundImage3>
              </div>
              <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[221.18px] items-start left-[788.66px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[96px] w-[358.336px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <HeadingBackgroundImageAndText text="Energy" additionalClassNames="w-[292.336px]" />
                <BackgroundImage3 additionalClassNames="h-[51.188px] w-[292.336px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[271px]">A cult, neon, psychedelic world that feels alive on the page.</p>
                </BackgroundImage3>
              </div>
              <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[221.18px] items-start left-[24px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[341.18px] w-[358.328px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <HeadingBackgroundImageAndText text="Permission" additionalClassNames="w-[292.328px]" />
                <BackgroundImage3 additionalClassNames="h-[76.781px] w-[292.328px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[268px]">A reminder that difference can become direction, and standing out can become a way of life.</p>
                </BackgroundImage3>
              </div>
            </BackgroundImage3>
            <BackgroundImage3 additionalClassNames="bg-[#0f0f0f] h-[628.383px] w-[1171px]">
              <div className="absolute h-[19.195px] left-[185.5px] top-[96px] w-[800px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.14px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Why Ash</p>
              </div>
              <div className="absolute h-[112.422px] left-[185.5px] top-[131.2px] w-[800px]" data-name="Heading 2">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.36px] not-italic text-[46.84px] text-center text-white top-0 w-[626px]">Written by someone who has actually lived the overlap.</p>
              </div>
              <div className="absolute h-[76.781px] left-[185.5px] top-[267.62px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.44px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[764px]">Ash Shaw is a South African writer, UV makeup artist, founder, cyclist, speaker, traveller, and lifelong builder of communities. His first book brings together decades of lived experience across subculture, entrepreneurship, movement, creativity, and radical self-expression.</p>
              </div>
              <div className="absolute h-[25.594px] left-[185.5px] top-[368.4px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.23px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] whitespace-nowrap">This is not theory from a distance. It is a life observed from the inside.</p>
              </div>
              <div className="absolute h-[66.391px] left-[185.5px] top-[441.99px] w-[800px]" data-name="Container">
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[60.65px] rounded-[20px] top-0 w-[141.648px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[70px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Writer / Author</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[210.3px] rounded-[20px] top-0 w-[94.391px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[46px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">UV Artist</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[312.69px] rounded-[20px] top-0 w-[87.313px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[43.5px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Founder</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[408px] rounded-[20px] top-0 w-[84.219px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[41px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Speaker</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[500.22px] rounded-[20px] top-0 w-[81.117px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[40.5px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Cyclist</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[589.34px] rounded-[20px] top-0 w-[150.016px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[74px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Festival Veteran</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[234.8px] rounded-[20px] top-[37.2px] w-[156.992px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[77.5px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Creative Director</p>
                </div>
                <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[rgba(255,16,240,0.3)] border-solid h-[29.195px] left-[399.8px] rounded-[20px] top-[37.2px] w-[165.398px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[82.5px] not-italic text-[#ff10f0] text-[12px] text-center top-[4px] tracking-[0.5px] uppercase whitespace-nowrap">Community Builder</p>
                </div>
              </div>
            </BackgroundImage3>
            <div className="bg-[#0f0f0f] flex-[1_0_0] min-h-px min-w-px relative w-[1171px]" data-name="Section">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[96px] px-[185.5px] relative size-full">
                <div className="bg-gradient-to-b from-[rgba(15,15,15,0.9)] h-[709.969px] relative rounded-[8px] shrink-0 to-[rgba(18,18,26,0.5)] w-full" data-name="Container">
                  <div className="overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute h-[19.195px] left-[34px] top-[50px] w-[732px]" data-name="Text">
                      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[366.2px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Read early</p>
                    </div>
                    <div className="absolute h-[112.422px] left-[34px] top-[85.2px] w-[732px]" data-name="Heading 2">
                      <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[366.41px] not-italic text-[46.84px] text-center text-white top-0 w-[699px]">The rough draft is open to early readers.</p>
                    </div>
                    <div className="absolute h-[51.188px] left-[34px] top-[221.62px] w-[732px]" data-name="Paragraph">
                      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[366.28px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[724px]">The book is still in progress. Some chapters are finished. Others are still being lived. That is part of the point.</p>
                    </div>
                    <div className="absolute h-[25.594px] left-[34px] top-[296.8px] w-[732px]" data-name="Paragraph">
                      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[366.38px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] whitespace-nowrap">Enter your email to unlock the draft preview and follow the making of the book as it evolves.</p>
                    </div>
                    <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[213.977px] items-start left-[34px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[354.4px] w-[732px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                      <TextBackgroundImageAndText1 text="Draft preview" additionalClassNames="w-[666px]" />
                      <div className="h-[88.781px] relative shrink-0 w-[666px]" data-name="List">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pl-[20px] relative size-full">
                          <BackgroundImage3 additionalClassNames="h-[25.594px] w-[646px]">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] whitespace-nowrap">Stories, lessons, and the making of a neon soul</p>
                          </BackgroundImage3>
                          <BackgroundImage4 additionalClassNames="w-[646px]">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[634px]">Childhood, neurodivergence, festivals, Berlin, bicycles, UV paint, and the cumulative effect of a life lived in full colour</p>
                          </BackgroundImage4>
                        </div>
                      </div>
                    </div>
                    <div className="absolute border border-[#d4008c] border-solid h-[59.594px] left-[305.51px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,16,240,0.3),0px_0px_15px_0px_rgba(255,16,240,0.2)] top-[600.38px] w-[188.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.498deg, rgb(255, 16, 240) 0%, rgb(190, 0, 254) 100%)" }}>
                      <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[93px] not-italic text-[16px] text-center text-white top-[15.5px] whitespace-nowrap">Unlock the Draft</p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                </div>
              </div>
            </div>
            <div className="bg-[#0f0f0f] h-[636.414px] relative shrink-0 w-[1171px]" data-name="Section">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] px-[24px] py-[96px] relative size-full">
                <div className="col-1 h-[444.414px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
                  <TextBackgroundImageAndText text="Beyond the page" additionalClassNames="w-[549.5px]" />
                  <div className="absolute h-[168.633px] left-0 top-[35.2px] w-[549.5px]" data-name="Heading 2">
                    <p className="absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-0 not-italic text-[46.84px] text-white top-0 w-[441px]">A book built to be spoken, shared, and experienced live.</p>
                  </div>
                  <div className="absolute h-[76.781px] left-0 top-[227.83px] w-[549.5px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[548px]">The site should make room for future talks, workshops, readings, festival appearances, podcasts, and media conversations. Show this as an active, expandable ecosystem around the book.</p>
                  </div>
                  <div className="absolute h-[59.594px] left-0 top-[328.61px] w-[549.5px]" data-name="Container">
                    <ButtonBackgroundImageAndText text="View events" additionalClassNames="left-0 w-[153.625px]" />
                    <ButtonBackgroundImageAndText text="Book a talk" additionalClassNames="left-[169.63px] w-[151.625px]" />
                    <ButtonBackgroundImageAndText text="Explore media" additionalClassNames="left-[337.25px] w-[169.578px]" />
                  </div>
                </div>
                <div className="col-2 h-[444.414px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
                  <TextBackgroundImageAndText text="Speaking" additionalClassNames="w-[549.5px]" />
                  <div className="absolute h-[224.844px] left-0 top-[35.2px] w-[549.5px]" data-name="Heading 2">
                    <p className="absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-0 not-italic text-[46.84px] text-white top-0 w-[538px]">Talks and workshops for creative communities, festivals, teams, and curious humans.</p>
                  </div>
                  <div className="absolute h-[76.781px] left-0 top-[284.04px] w-[549.5px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-1px] w-[529px]">The themes of the book naturally extend into live conversations about creativity, difference, identity, freedom, courage, community, and building a life that funds the work.</p>
                  </div>
                  <div className="absolute h-[59.594px] left-0 top-[384.82px] w-[549.5px]" data-name="Container">
                    <ButtonBackgroundImageAndText text="Enquire about speaking" additionalClassNames="left-0 w-[242.406px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0f0f0f] h-[693.594px] relative shrink-0 w-[1171px]" data-name="Section">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[96px] px-[24px] relative size-full">
                <div className="h-[222.805px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute h-[19.195px] left-0 top-0 w-[1123px]" data-name="Text">
                    <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[562.49px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Journal</p>
                  </div>
                  <div className="absolute h-[112.422px] left-0 top-[35.2px] w-[1123px]" data-name="Heading 2">
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[561.96px] not-italic text-[46.84px] text-center text-white top-0 w-[1099px]">Notes, field reports, videos, and companion pieces from the world of the book.</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[161.5px] top-[171.62px] w-[800px]" data-name="Paragraph">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.23px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[792px]">The Journal is where blog posts, podcasts, videos, and related reflections live together. It should feel like an editorial companion to the book, not a separate content silo.</p>
                  </div>
                </div>
                <div className="h-[278.789px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[278.789px] items-start left-0 pl-[33px] pr-px py-[33px] rounded-[8px] top-0 w-[358.328px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                    <TextBackgroundImageAndText1 text="Essay" additionalClassNames="w-[292.328px]" />
                    <BackgroundImage4 additionalClassNames="w-[292.328px]">
                      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[229px]">What the dancefloor taught me about belonging</p>
                    </BackgroundImage4>
                    <BackgroundImage3 additionalClassNames="h-[46.398px] w-[292.328px]">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#d4008c] text-[14px] top-[24.5px] whitespace-nowrap">Read piece →</p>
                    </BackgroundImage3>
                  </div>
                  <div className="absolute bg-[rgba(15,15,15,0.8)] border border-[rgba(255,16,240,0.2)] border-solid h-[278.789px] left-[382.33px] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)] top-0 w-[358.336px]" data-name="Container">
                    <BackgroundImageAndText1 text="Video" />
                    <div className="absolute h-[76.797px] left-[32px] top-[67.2px] w-[292.336px]" data-name="Heading 3">
                      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[258px]">UV paint and becoming visible</p>
                    </div>
                    <BackgroundImageAndText2 text="Watch video →" />
                  </div>
                  <div className="absolute bg-[rgba(15,15,15,0.8)] border border-[rgba(255,16,240,0.2)] border-solid h-[278.789px] left-[764.66px] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)] top-0 w-[358.336px]" data-name="Container">
                    <BackgroundImageAndText1 text="Podcast" />
                    <div className="absolute h-[76.797px] left-[32px] top-[67.2px] w-[292.336px]" data-name="Heading 3">
                      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[232px]">Notes on living in full colour</p>
                    </div>
                    <BackgroundImageAndText2 text="Listen →" />
                  </div>
                </div>
              </div>
            </div>
            <BackgroundImage3 additionalClassNames="bg-[#0f0f0f] h-[414.992px] w-[1171px]">
              <div className="absolute h-[56.211px] left-[185.5px] top-[96px] w-[800px]" data-name="Heading 2">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.77px] not-italic text-[46.84px] text-center text-white top-0 whitespace-nowrap">Start reading the rough draft.</p>
              </div>
              <div className="absolute h-[51.188px] left-[185.5px] top-[176.21px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.35px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[769px]">Enter your email for early access, future chapter drops, launch news, and first notice when pre-orders open.</p>
              </div>
              <div className="absolute h-[59.594px] left-[185.5px] top-[259.4px] w-[800px]" data-name="Container">
                <ButtonBackgroundImageAndText1 text="Unlock the Draft" additionalClassNames="left-[205.31px]" />
                <ButtonBackgroundImageAndText text="Join the Waitlist" additionalClassNames="left-[410.3px] w-[184.383px]" />
              </div>
            </BackgroundImage3>
          </div>
          <div className="absolute bg-[#0f0f0f] h-[623.961px] left-0 top-[5977.7px] w-[1171px]" data-name="Footer">
            <div className="content-stretch flex flex-col items-start overflow-clip pt-[97px] px-[24px] relative rounded-[inherit] size-full">
              <div className="content-stretch flex flex-col gap-[64px] h-[430.961px] items-start relative shrink-0 w-full" data-name="Container">
                <div className="h-[291.961px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute content-stretch flex flex-col gap-[52px] h-[291.961px] items-start left-0 pt-[8px] top-0 w-[342.328px]" data-name="Container">
                    <BackgroundImage3 additionalClassNames="h-[54.398px] w-[342.328px]">
                      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[#f4ff3c] text-[24px] top-[16px] whitespace-nowrap">This one time on acid...</p>
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[81.586px] w-[342.328px]">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27.2px] left-0 not-italic text-[#cfc7bb] text-[16px] top-[-0.5px] w-[334px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                    </BackgroundImage3>
                  </div>
                  <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[366.33px] top-0 w-[171.172px]" data-name="Navigation">
                    <BackgroundImageAndText text="The Book" />
                    <div className="content-stretch flex flex-col gap-[12px] h-[213.563px] items-start relative shrink-0 w-full" data-name="List">
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Home" additionalClassNames="w-[44.617px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="The Book" additionalClassNames="w-[71.75px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Read the Draft" additionalClassNames="w-[110.25px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Ebook Reader" additionalClassNames="w-[105.484px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Draft Viewer" additionalClassNames="w-[94.484px]" />
                      </BackgroundImage3>
                      <BackgroundImage4 additionalClassNames="w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Waitlist" additionalClassNames="w-[54.961px]" />
                      </BackgroundImage4>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[561.5px] top-0 w-[171.164px]" data-name="Navigation">
                    <BackgroundImage6>{`Author & Press`}</BackgroundImage6>
                    <div className="content-stretch flex flex-col gap-[12px] h-[201.563px] items-start relative shrink-0 w-full" data-name="List">
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="About Ash" additionalClassNames="w-[78.547px]" />
                      </BackgroundImage3>
                      <BackgroundImage4 additionalClassNames="w-[171.164px]">
                        <div className="absolute h-[51.188px] left-0 top-0 w-[171.164px]" data-name="Button">
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] w-[85px]">{`Speaking & Workshops`}</p>
                        </div>
                      </BackgroundImage4>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="Events" additionalClassNames="w-[50.867px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <div className="absolute h-[25.594px] left-0 top-0 w-[107.414px]" data-name="Button">
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] whitespace-nowrap">{`Media & Press`}</p>
                        </div>
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="Contact" additionalClassNames="w-[60.141px]" />
                      </BackgroundImage3>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[756.66px] top-0 w-[171.164px]" data-name="Navigation">
                    <BackgroundImageAndText text="Content" />
                    <div className="content-stretch flex flex-col gap-[12px] h-[138.375px] items-start relative shrink-0 w-full" data-name="List">
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="Journal" additionalClassNames="w-[55.664px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="Blog" additionalClassNames="w-[33.5px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="Videos" additionalClassNames="w-[51.773px]" />
                      </BackgroundImage3>
                      <BackgroundImage4 additionalClassNames="w-[171.164px]">
                        <ButtonBackgroundImageAndText2 text="Podcasts" additionalClassNames="w-[69.891px]" />
                      </BackgroundImage4>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[951.83px] top-0 w-[171.172px]" data-name="Navigation">
                    <BackgroundImageAndText text="Discover" />
                    <div className="content-stretch flex flex-col gap-[12px] h-[100.781px] items-start relative shrink-0 w-full" data-name="List">
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Search" additionalClassNames="w-[52.617px]" />
                      </BackgroundImage3>
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Thank You" additionalClassNames="w-[79.57px]" />
                      </BackgroundImage3>
                      <BackgroundImage4 additionalClassNames="w-[171.172px]">
                        <ButtonBackgroundImageAndText2 text="Dev Tools" additionalClassNames="w-[74.211px]" />
                      </BackgroundImage4>
                    </div>
                  </div>
                </div>
                <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
                  <div aria-hidden="true" className="absolute border-[#f8f8f8] border-solid border-t inset-0 pointer-events-none" />
                  <div className="absolute content-stretch flex h-[19.195px] items-start left-0 top-[44.4px] w-[338.5px]" data-name="Container">
                    <BackgroundImage3 additionalClassNames="h-[19.195px] w-[221.852px]">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#cfc7bb] text-[12px] top-0 whitespace-nowrap">© 2026 Ash Shaw. All Rights Reserved.</p>
                    </BackgroundImage3>
                  </div>
                  <div className="absolute content-stretch flex gap-[16px] h-[42px] items-center justify-center left-[362.5px] top-[33px] w-[398px]" data-name="Container">
                    <div className="bg-[#fafafa] h-[42px] relative rounded-[9999px] shrink-0 w-[110px]" data-name="ThemeSwitcher">
                      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center px-[5px] py-px relative size-full">
                        <BackgroundImage7>
                          <BackgroundImage1>
                            <g clipPath="url(#clip0_4159_887)" id="IconBase">
                              <path d={svgPaths.peb9db00} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                            </g>
                            <defs>
                              <clipPath id="clip0_4159_887">
                                <rect fill="white" height="16" width="16" />
                              </clipPath>
                            </defs>
                          </BackgroundImage1>
                        </BackgroundImage7>
                        <BackgroundImage7 additionalClassNames="bg-[#d4008c] shadow-[0px_0px_10px_0px_rgba(255,16,240,0.5)]">
                          <IconBaseBackgroundImage>
                            <path d={svgPaths.p894cf00} fill="var(--fill-0, white)" id="Vector" />
                          </IconBaseBackgroundImage>
                        </BackgroundImage7>
                        <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[16px]" data-name="Button">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
                              <IconBaseBackgroundImage>
                                <path d={svgPaths.pdd06300} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                              </IconBaseBackgroundImage>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <BackgroundImage3 additionalClassNames="h-[36px] w-[236px]">
                      <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                        <IconBackgroundImage />
                      </div>
                      <div className="absolute content-stretch flex items-center justify-center left-[40px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                        <IconBackgroundImage1 />
                      </div>
                      <div className="absolute content-stretch flex items-center justify-center left-[80px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                        <IconBackgroundImage2 />
                      </div>
                      <div className="absolute content-stretch flex items-center justify-center left-[120px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                        <IconBackgroundImage3 />
                      </div>
                      <div className="absolute content-stretch flex items-center justify-center left-[160px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                        <IconBackgroundImage4 />
                      </div>
                      <div className="absolute content-stretch flex items-center justify-center left-[200px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                        <IconBackgroundImage5 />
                      </div>
                    </BackgroundImage3>
                    <div className="relative shrink-0 size-[20px]" data-name="Button">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                        <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="IconBase">
                          <div className="absolute inset-[12.49%_6.24%_12.5%_6.25%]" data-name="Vector">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.502 15.0011">
                              <path d={svgPaths.p8c3f580} fill="var(--fill-0, #F6F2EB)" id="Vector" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex gap-[16px] h-[25.594px] items-start justify-end left-[784.5px] top-[41.2px] w-[338.5px]" data-name="Container">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[104.961px]">
                      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[52.5px] not-italic text-[#9c9488] text-[16px] text-center top-[-1px] whitespace-nowrap">Privacy Policy</p>
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[127.57px]">
                      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[64px] not-italic text-[#9c9488] text-[16px] text-center top-[-1px] whitespace-nowrap">Terms of Service</p>
                    </BackgroundImage3>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
          </div>
        </div>
        <div className="absolute bg-[rgba(15,15,15,0.95)] border-[rgba(255,16,240,0.2)] border-b border-solid h-[108.594px] left-0 top-0 w-[1171px]" data-name="Header">
          <div className="absolute content-stretch flex h-[43.594px] items-start left-[24px] top-[32px] w-[429.055px]" data-name="Container">
            <div className="bg-[rgba(255,255,255,0)] h-[43.594px] relative rounded-[4px] shrink-0 w-[133.547px]" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[#d4008c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_10px_0px_rgba(255,58,174,0.2)]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[67px] not-italic text-[#d4008c] text-[16px] text-center top-[8.5px] tracking-[2px] uppercase whitespace-nowrap">[ X ] Menu</p>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[56px] items-start justify-center left-[453.05px] pt-[8px] top-[25.8px] w-[264.891px]" data-name="Container">
            <BackgroundImage3 additionalClassNames="h-[48px] w-[264.891px]">
              <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#f4ff3c] text-[20px] top-[16.5px] tracking-[1px] uppercase whitespace-nowrap">This one time on acid...</p>
            </BackgroundImage3>
          </div>
          <div className="absolute h-[59.594px] left-[717.95px] top-[24px] w-[429.055px]" data-name="Container">
            <ButtonBackgroundImageAndText1 text="Unlock the Draft" additionalClassNames="left-[240.07px]" />
            <div className="absolute bg-[rgba(15,15,15,0.8)] left-[184.07px] rounded-[22px] size-[44px] top-[7.8px]" data-name="ThemeToggleES5">
              <div className="content-stretch flex items-center justify-center overflow-clip px-[15.977px] py-[2px] relative rounded-[inherit] size-full">
                <div className="h-[20px] relative shadow-[0px_0px_8px_0px_#ff10f0] shrink-0 w-[12.047px]" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <p className="font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#ff10f0] text-[20px] text-center whitespace-nowrap">☾</p>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.4)] border-solid inset-0 pointer-events-none rounded-[22px] shadow-[0px_0px_12px_0px_rgba(255,16,240,0.2)]" />
            </div>
          </div>
          <div className="absolute h-[862px] left-0 top-0 w-[1171px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1171 862\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -72.703 -72.703 0 585.5 431)\\'><stop stop-color=\\'rgba(255,16,240,0.1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(15, 15, 15) 0%, rgb(15, 15, 15) 100%)" }}>
            <div className="content-stretch flex flex-col items-center overflow-clip pb-[2px] pl-px pr-[2px] pt-[102px] relative rounded-[inherit] size-full">
              <BackgroundImage3 additionalClassNames="h-[1247px] w-[1116px]">
                <div className="absolute content-stretch flex h-[66px] items-center justify-center left-[440.13px] px-[41px] py-[17px] rounded-[4px] top-[1093.17px] w-[235.734px]" data-name="Button" style={{ backgroundImage: "linear-gradient(164.359deg, rgb(255, 16, 240) 0%, rgb(190, 0, 254) 100%)" }}>
                  <div aria-hidden="true" className="absolute border border-[#d4008c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,16,240,0.3),0px_0px_15px_0px_rgba(255,16,240,0.2)]" />
                  <p className="font-['Righteous:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
                </div>
                <div className="absolute h-[36px] left-[440px] top-[1211.17px] w-[236px]" data-name="SocialLinks">
                  <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                    <IconBackgroundImage />
                  </div>
                  <div className="absolute content-stretch flex items-center justify-center left-[40px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                    <IconBackgroundImage1 />
                  </div>
                  <div className="absolute content-stretch flex items-center justify-center left-[80px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                    <IconBackgroundImage2 />
                  </div>
                  <div className="absolute content-stretch flex items-center justify-center left-[120px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                    <IconBackgroundImage3 />
                  </div>
                  <div className="absolute content-stretch flex items-center justify-center left-[160px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                    <IconBackgroundImage4 />
                  </div>
                  <div className="absolute content-stretch flex items-center justify-center left-[200px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                    <IconBackgroundImage5 />
                  </div>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[519.61px] top-0 w-[76.781px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[38.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Home</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[490.33px] top-[59.4px] w-[135.344px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[68px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">The Book</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[447px] top-[118.8px] w-[221.992px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[111.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Read the Draft</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[481.51px] top-[178.2px] w-[152.977px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[76px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">About Ash</p>
                </div>
                <LinkBackgroundImageAndText text="Journal" additionalClassNames="left-[497.63px] top-[237.59px] w-[120.734px]" />
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[508.41px] top-[296.99px] w-[99.18px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[50px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Events</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[492.94px] top-[356.39px] w-[130.117px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[65.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Speaking</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[517.05px] top-[415.79px] w-[81.898px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[41px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Media</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[496.55px] top-[475.19px] w-[122.891px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[61.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Contact</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[522.22px] top-[534.59px] w-[71.555px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[36px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Blog</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[510.29px] top-[593.98px] w-[95.414px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[48px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Videos</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[487.92px] top-[653.38px] w-[140.148px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[70.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Podcasts</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[505.86px] top-[712.78px] w-[104.273px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[52.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Search</p>
                </div>
                <LinkBackgroundImageAndText text="Waitlist" additionalClassNames="left-[497.75px] top-[772.18px] w-[120.5px]" />
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[456.09px] top-[831.58px] w-[203.813px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[102px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Ebook Reader</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[463.2px] top-[890.98px] w-[189.586px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[95px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Draft Viewer</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[481.7px] top-[950.38px] w-[152.602px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[76.5px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Thank You</p>
                </div>
                <div className="absolute border-[#e5e5e5] border-b border-solid h-[39.398px] left-[484.38px] top-[1009.77px] w-[147.25px]" data-name="Link">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[74px] not-italic text-[#1a1a1a] text-[24px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Dev Tools</p>
                </div>
              </BackgroundImage3>
            </div>
            <div aria-hidden="true" className="absolute border-[#333] border-b-2 border-l border-r-2 border-solid border-t-2 inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}