import clsx from "clsx";
import svgPaths from "./svg-o4ctd1iedc";
type ButtonBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImage1Props>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(162.88deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }} className={clsx("h-[57.594px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] w-[186.984px]", additionalClassNames)}>
      {children}
    </div>
  );
}
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("relative rounded-[16px] shrink-0 size-[32px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
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
    <div className="absolute h-[25.594px] left-0 top-0">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] whitespace-nowrap">{children}</p>
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

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </div>
  );
}

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage>
      <g id="Icon">{children}</g>
    </BackgroundImage>
  );
}

function IconBaseBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="IconBase">{children}</g>
    </BackgroundImage1>
  );
}
type ButtonBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText1({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText1Props) {
  return <BackgroundImage2 additionalClassNames={additionalClassNames}>{text}</BackgroundImage2>;
}
type LinkBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LinkBackgroundImageAndText({ text, additionalClassNames = "" }: LinkBackgroundImageAndTextProps) {
  return (
    <BackgroundImage5 additionalClassNames={clsx("relative w-[376px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#d4008c] text-[14px] top-[24.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] rounded-[20px] top-0", additionalClassNames)}>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[43.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">{text}</p>
    </div>
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
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <BackgroundImage3 additionalClassNames="h-[38.398px] w-[376px]">
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 whitespace-nowrap">{text}</p>
    </BackgroundImage3>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[59.594px] items-center justify-center px-[33px] py-[17px] rounded-[4px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[#1a1a1a] text-[16px] text-center whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[19.195px] left-0 top-0 w-[442px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#8c7a00] text-[12px] top-0 tracking-[2px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function ThisOneTimeOnAcid() {
  return (
    <div className="bg-white relative size-full" data-name="This One Time on Acid">
      <div className="absolute bg-[#0f0f0f] h-[836px] left-0 top-0 w-[482px]" data-name="RootLayout">
        <div className="absolute h-[7410.609px] left-0 top-[102.19px] w-[482px]" data-name="BookHomePage">
          <div className="absolute content-stretch flex h-[1363.883px] items-center left-0 px-[20px] top-0 w-[482px]" data-name="Section">
            <BackgroundImage4 additionalClassNames="h-[1203.883px]">
              <div className="absolute h-[550.555px] left-0 top-0 w-[442px]" data-name="Container">
                <TextBackgroundImageAndText text="First book by Ash Shaw" />
                <div className="absolute h-[105.594px] left-0 top-[35.2px] w-[442px]" data-name="Heading 1">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[52.8px] left-0 not-italic text-[48px] text-white top-[-1px] w-[361px]">This one time on acid...</p>
                </div>
                <div className="absolute h-[81px] left-0 top-[164.79px] w-[442px]" data-name="Heading 2">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[18px] text-white top-[0.5px] w-[410px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                </div>
                <div className="absolute h-[51.188px] left-0 top-[269.79px] w-[442px]" data-name="Paragraph">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[437px]">For misfits, makers, dancers, seekers, festival people, and anyone wired a little differently.</p>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[59.594px] items-end left-0 top-[352.98px] w-[442px]" data-name="Form">
                  <div className="flex-[1_0_0] h-[59.594px] min-h-px min-w-px relative" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[239.016px]" data-name="Email Input">
                        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-[16px] relative size-full">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#a3a3a3] text-[16px] whitespace-nowrap">Email address</p>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                    </div>
                  </div>
                  <ButtonBackgroundImage1 additionalClassNames="relative shrink-0">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[32px] py-[16px] relative size-full">
                      <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
                    </div>
                  </ButtonBackgroundImage1>
                </div>
                <div className="absolute h-[38.391px] left-0 top-[428.57px] w-[442px]" data-name="Paragraph">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#6b6b6b] text-[12px] top-0 w-[429px]">Enter your email to read the rough draft, get chapter updates, and hear first when pre-orders open.</p>
                </div>
                <div className="absolute h-[59.594px] left-0 top-[490.96px] w-[442px]" data-name="Container">
                  <ButtonBackgroundImageAndText text="Join the Waitlist" additionalClassNames="left-0 top-0 w-[184.383px]" />
                </div>
              </div>
              <div className="absolute bg-[#d4008c] h-[589.328px] left-0 rounded-[8px] top-[614.55px] w-[442px]" data-name="Container">
                <div className="content-stretch flex flex-col gap-[65.463px] items-center justify-center overflow-clip pb-[7.537px] pt-px px-px relative rounded-[inherit] size-full">
                  <div className="flex h-[92.074px] items-center justify-center relative shrink-0 w-[378.528px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "57" } as React.CSSProperties}>
                    <div className="-rotate-2 flex-none">
                      <BackgroundImage5 additionalClassNames="h-[79px] relative w-[376px]">
                        <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[39.6px] left-[189.59px] not-italic text-[36px] text-center text-white top-[-8.99px] whitespace-nowrap">{`This one time on `}</p>
                        <div className="absolute content-stretch flex h-[46.951px] items-start left-[138.28px] shadow-[0px_0px_24px_0px_rgba(255,16,240,0.4)] top-[36.75px] w-[72.525px]" data-name="Text">
                          <p className="bg-clip-text font-['Righteous:Regular',sans-serif] leading-[39.6px] not-italic relative shrink-0 text-[36px] text-[transparent] text-center whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(255, 16, 240) 0%, rgb(190, 0, 254) 25%, rgb(0, 247, 255) 50%, rgb(57, 255, 20) 75%, rgb(244, 255, 60) 100%)" }}>
                            acid
                          </p>
                        </div>
                        <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[39.6px] left-[224.72px] not-italic text-[36px] text-center text-white top-[39.04px] whitespace-nowrap">...</p>
                      </BackgroundImage5>
                    </div>
                  </div>
                  <BackgroundImage3 additionalClassNames="h-[28.797px] w-[163.07px]">
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[28.8px] left-[82px] not-italic text-[#8c7a00] text-[18px] text-center top-0 tracking-[4px] uppercase whitespace-nowrap">by Ash Shaw</p>
                  </BackgroundImage3>
                </div>
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_20px_50px_0px_rgba(0,0,0,0.5),0px_0px_30px_0px_rgba(255,58,174,0.4)]" />
              </div>
            </BackgroundImage4>
          </div>
          <div className="absolute bg-[#f0f0f0] h-[516.742px] left-0 top-[1363.88px] w-[482px]" data-name="Section">
            <div className="absolute h-[19.195px] left-[20px] top-[64px] w-[442px]" data-name="Text">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[221.09px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">What it is</p>
            </div>
            <div className="absolute h-[76.797px] left-[20px] top-[99.2px] w-[442px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[221.22px] not-italic text-[32px] text-center text-white top-0 w-[382px]">A memoir. A guide. A neon map back to yourself.</p>
            </div>
            <div className="absolute h-[127.969px] left-[20px] top-[199.99px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.34px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[440px]">This one time on acid... is a hybrid memoir and creative-life guide built from a life lived across dancefloors, cities, bicycles, studios, festivals, businesses, and strange turning points. It brings together wild stories, subculture, identity, art, and lived lessons into one vivid body of work.</p>
            </div>
            <div className="absolute h-[76.781px] left-[20px] top-[351.96px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.13px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[421px]">This is not a polished success story. It is a raw, evolving book about becoming more visible, more honest, more creative, and more fully yourself.</p>
            </div>
          </div>
          <div className="absolute h-[351.953px] left-[20px] top-[1944.63px] w-[442px]" data-name="Section">
            <div className="absolute h-[19.195px] left-0 top-0 w-[442px]" data-name="Text">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[221.48px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Why care</p>
            </div>
            <div className="absolute h-[115.195px] left-0 top-[35.2px] w-[442px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[221.28px] not-italic text-[32px] text-center text-white top-0 w-[428px]">Because the point is not just to survive your life. It is to live it fully.</p>
            </div>
            <div className="absolute h-[76.781px] left-0 top-[174.39px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.01px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[436px]">Beneath the stories of psytrance culture, travel, UV paint, and creative reinvention is a deeper question: how do you build a life that actually feels like yours?</p>
            </div>
            <div className="absolute h-[76.781px] left-0 top-[275.17px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.41px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[416px]">This book is for people who want more aliveness, more freedom, more belonging, and more permission to become who they already are.</p>
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] h-[1006.344px] left-0 top-[2384.58px] w-[482px]" data-name="Section">
            <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[195.586px] items-start left-[20px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[64px] w-[442px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
              <HeadingBackgroundImageAndText text="Stories" />
              <BackgroundImage3 additionalClassNames="h-[51.188px] w-[376px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[370px]">Raw scenes from festivals, cities, movement, art, risk, and identity.</p>
              </BackgroundImage3>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[195.586px] items-start left-[20px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[291.59px] w-[442px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
              <HeadingBackgroundImageAndText text="Lessons" />
              <BackgroundImage3 additionalClassNames="h-[51.188px] w-[376px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[304px]">Hard-won insights on freedom, visibility, creativity, belonging, and courage.</p>
              </BackgroundImage3>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[195.586px] items-start left-[20px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[519.17px] w-[442px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
              <HeadingBackgroundImageAndText text="Energy" />
              <BackgroundImage3 additionalClassNames="h-[51.188px] w-[376px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[374px]">A cult, neon, psychedelic world that feels alive on the page.</p>
              </BackgroundImage3>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[195.586px] items-start left-[20px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[746.76px] w-[442px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
              <HeadingBackgroundImageAndText text="Permission" />
              <BackgroundImage3 additionalClassNames="h-[51.188px] w-[376px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[372px]">A reminder that difference can become direction, and standing out can become a way of life.</p>
              </BackgroundImage3>
            </div>
          </div>
          <div className="absolute h-[532.344px] left-[20px] top-[3454.92px] w-[442px]" data-name="Section">
            <div className="absolute h-[19.195px] left-0 top-0 w-[442px]" data-name="Text">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[221.14px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Why Ash</p>
            </div>
            <div className="absolute h-[76.797px] left-0 top-[35.2px] w-[442px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[221.41px] not-italic text-[32px] text-center text-white top-0 w-[428px]">Written by someone who has actually lived the overlap.</p>
            </div>
            <div className="absolute h-[127.969px] left-0 top-[135.99px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.39px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[426px]">Ash Shaw is a South African writer, UV makeup artist, founder, cyclist, speaker, traveller, and lifelong builder of communities. His first book brings together decades of lived experience across subculture, entrepreneurship, movement, creativity, and radical self-expression.</p>
            </div>
            <div className="absolute h-[51.188px] left-0 top-[287.96px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.3px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[406px]">This is not theory from a distance. It is a life observed from the inside.</p>
            </div>
            <div className="absolute h-[145.195px] left-0 top-[387.15px] w-[442px]" data-name="Container">
              <div className="absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] left-[2.2px] rounded-[20px] top-0 w-[131.266px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[65px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Writer / Author</p>
              </div>
              <div className="absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] left-[145.47px] rounded-[20px] top-0 w-[93.766px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[46px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">UV Artist</p>
              </div>
              <TextBackgroundImageAndText1 text="Founder" additionalClassNames="left-[251.23px] w-[88.391px]" />
              <TextBackgroundImageAndText1 text="Speaker" additionalClassNames="left-[351.63px] w-[88.172px]" />
              <div className="absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] left-[26.84px] rounded-[20px] top-[52.4px] w-[78.57px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[38.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Cyclist</p>
              </div>
              <div className="absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] left-[117.41px] rounded-[20px] top-[52.4px] w-[139.617px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[69px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Festival Veteran</p>
              </div>
              <div className="absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] left-[269.03px] rounded-[20px] top-[52.4px] w-[146.125px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[72.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Creative Director</p>
              </div>
              <div className="absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] left-[141.35px] rounded-[20px] top-[104.8px] w-[159.289px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[79px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Community Builder</p>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] content-stretch flex flex-col h-[894.313px] items-start left-0 pt-[64px] px-[20px] top-[4075.27px] w-[482px]" data-name="Section">
            <div className="bg-gradient-to-b from-[#f8f8f8] h-[766.313px] relative rounded-[8px] shrink-0 to-[rgba(18,18,26,0.5)] w-full" data-name="Container">
              <div className="overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute h-[19.195px] left-[21px] top-[33px] w-[400px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[200.2px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Read early</p>
                </div>
                <div className="absolute h-[76.797px] left-[21px] top-[68.2px] w-[400px]" data-name="Heading 2">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[200.45px] not-italic text-[32px] text-center text-white top-0 w-[394px]">The rough draft is open to early readers.</p>
                </div>
                <div className="absolute h-[76.781px] left-[21px] top-[168.99px] w-[400px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[200.14px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[381px]">The book is still in progress. Some chapters are finished. Others are still being lived. That is part of the point.</p>
                </div>
                <div className="absolute h-[51.188px] left-[21px] top-[269.77px] w-[400px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[200.41px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[364px]">Enter your email to unlock the draft preview and follow the making of the book as it evolves.</p>
                </div>
                <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[290.758px] items-start left-[21px] pb-px pl-[33px] pr-px pt-[33px] rounded-[8px] top-[352.96px] w-[400px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                  <BackgroundImage3 additionalClassNames="h-[19.195px] w-[334px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#50c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Draft preview</p>
                  </BackgroundImage3>
                  <div className="h-[165.563px] relative shrink-0 w-[334px]" data-name="List">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pl-[20px] relative size-full">
                      <BackgroundImage3 additionalClassNames="h-[51.188px] w-[314px]">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] w-[278px]">Stories, lessons, and the making of a neon soul</p>
                      </BackgroundImage3>
                      <BackgroundImage4 additionalClassNames="w-[314px]">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] w-[290px]">Childhood, neurodivergence, festivals, Berlin, bicycles, UV paint, and the cumulative effect of a life lived in full colour</p>
                      </BackgroundImage4>
                    </div>
                  </div>
                </div>
                <ButtonBackgroundImage1 additionalClassNames="absolute left-[127.51px] top-[675.72px]">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[93px] not-italic text-[16px] text-center text-white top-[15.5px] whitespace-nowrap">Unlock the Draft</p>
                </ButtonBackgroundImage1>
              </div>
              <div aria-hidden="true" className="absolute border border-[#50c] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>
          </div>
          <div className="absolute h-[828.313px] left-[20px] top-[5033.58px] w-[442px]" data-name="Section">
            <div className="absolute h-[397.555px] left-0 top-0 w-[442px]" data-name="Container">
              <TextBackgroundImageAndText text="Beyond the page" />
              <div className="absolute h-[76.797px] left-0 top-[35.2px] w-[442px]" data-name="Heading 2">
                <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[32px] text-white top-0 w-[431px]">A book built to be spoken, shared, and experienced live.</p>
              </div>
              <div className="absolute h-[102.375px] left-0 top-[135.99px] w-[442px]" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[416px]">The site should make room for future talks, workshops, readings, festival appearances, podcasts, and media conversations. Show this as an active, expandable ecosystem around the book.</p>
              </div>
              <div className="absolute h-[135.188px] left-0 top-[262.37px] w-[442px]" data-name="Container">
                <ButtonBackgroundImageAndText text="View events" additionalClassNames="left-0 top-0 w-[153.625px]" />
                <ButtonBackgroundImageAndText text="Book a talk" additionalClassNames="left-[169.63px] top-0 w-[151.625px]" />
                <ButtonBackgroundImageAndText text="Explore media" additionalClassNames="left-0 top-[75.59px] w-[169.578px]" />
              </div>
            </div>
            <div className="absolute h-[398.758px] left-0 top-[429.55px] w-[442px]" data-name="Container">
              <TextBackgroundImageAndText text="Speaking" />
              <div className="absolute h-[153.594px] left-0 top-[35.2px] w-[442px]" data-name="Heading 2">
                <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[32px] text-white top-0 w-[429px]">Talks and workshops for creative communities, festivals, teams, and curious humans.</p>
              </div>
              <div className="absolute h-[102.375px] left-0 top-[212.79px] w-[442px]" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[403px]">The themes of the book naturally extend into live conversations about creativity, difference, identity, freedom, courage, community, and building a life that funds the work.</p>
              </div>
              <div className="absolute h-[59.594px] left-0 top-[339.16px] w-[442px]" data-name="Container">
                <ButtonBackgroundImageAndText text="Enquire about speaking" additionalClassNames="left-0 top-0 w-[242.406px]" />
              </div>
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] content-stretch flex flex-col h-[1113.141px] items-start left-0 pt-[64px] px-[20px] top-[5925.89px] w-[482px]" data-name="Section">
            <div className="h-[276.766px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute h-[19.195px] left-0 top-0 w-[442px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[221.99px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Journal</p>
              </div>
              <div className="absolute h-[115.195px] left-0 top-[35.2px] w-[442px]" data-name="Heading 2">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[221.31px] not-italic text-[32px] text-center text-white top-0 w-[413px]">Notes, field reports, videos, and companion pieces from the world of the book.</p>
              </div>
              <div className="absolute h-[102.375px] left-0 top-[174.39px] w-[442px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.16px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[421px]">The Journal is where blog posts, podcasts, videos, and related reflections live together. It should feel like an editorial companion to the book, not a separate content silo.</p>
              </div>
            </div>
            <div className="h-[708.375px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[240.391px] items-start left-0 pl-[33px] pr-px py-[33px] rounded-[8px] top-0 w-[442px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                <BackgroundImage3 additionalClassNames="h-[19.195px] w-[376px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#8c7a00] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Essay</p>
                </BackgroundImage3>
                <BackgroundImage4 additionalClassNames="w-[376px]">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[350px]">What the dancefloor taught me about belonging</p>
                </BackgroundImage4>
                <LinkBackgroundImageAndText text="Read piece →" additionalClassNames="h-[46.398px] shrink-0" />
              </div>
              <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[201.992px] items-start left-0 pl-[33px] pr-px py-[33px] rounded-[8px] top-[272.39px] w-[442px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                <BackgroundImage3 additionalClassNames="h-[19.195px] w-[376px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#39ff14] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Video</p>
                </BackgroundImage3>
                <HeadingBackgroundImageAndText text="UV paint and becoming visible" />
                <LinkBackgroundImageAndText text="Watch video →" additionalClassNames="flex-[1_0_0] min-h-px min-w-px" />
              </div>
              <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[201.992px] items-start left-0 pl-[33px] pr-px py-[33px] rounded-[8px] top-[506.38px] w-[442px]" data-name="Container">
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                <BackgroundImage3 additionalClassNames="h-[19.195px] w-[376px]">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#d4008c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Podcast</p>
                </BackgroundImage3>
                <HeadingBackgroundImageAndText text="Notes on living in full colour" />
                <LinkBackgroundImageAndText text="Listen →" additionalClassNames="flex-[1_0_0] min-h-px min-w-px" />
              </div>
            </div>
          </div>
          <div className="absolute h-[243.578px] left-[20px] top-[7103.03px] w-[442px]" data-name="Section">
            <div className="absolute h-[76.797px] left-0 top-0 w-[442px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[221.49px] not-italic text-[32px] text-center text-white top-0 w-[357px]">Start reading the rough draft.</p>
            </div>
            <div className="absolute h-[51.188px] left-0 top-[100.8px] w-[442px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[221.21px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[416px]">Enter your email for early access, future chapter drops, launch news, and first notice when pre-orders open.</p>
            </div>
            <div className="absolute h-[59.594px] left-0 top-[183.98px] w-[442px]" data-name="Container">
              <div className="absolute content-stretch flex h-[59.594px] items-center justify-center left-[27.31px] px-[32px] py-[16px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-0 w-[186.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.322deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
              </div>
              <ButtonBackgroundImageAndText text="Join the Waitlist" additionalClassNames="left-[230.3px] top-0 w-[184.383px]" />
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fafafa] h-[1990.266px] left-0 top-[7512.8px] w-[482px]" data-name="Footer">
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[65px] px-[20px] relative rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[64px] h-[1861.266px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="h-[1274.266px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute content-stretch flex flex-col gap-[52px] h-[171.984px] items-start left-0 top-0 w-[442px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[38.398px] w-[442px]">
                    <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[#8c7a00] text-[24px] top-0 whitespace-nowrap">This one time on acid...</p>
                  </BackgroundImage3>
                  <BackgroundImage4 additionalClassNames="w-[442px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27.2px] left-0 not-italic text-[#6b6b6b] text-[16px] top-[-0.5px] w-[401px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                  </BackgroundImage4>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-0 top-[211.98px] w-[442px]" data-name="Navigation">
                  <BackgroundImageAndText text="The Book" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[213.563px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Home" additionalClassNames="w-[44.617px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="The Book" additionalClassNames="w-[71.75px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Read the Draft" additionalClassNames="w-[110.25px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Ebook Reader" additionalClassNames="w-[105.484px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Draft Viewer" additionalClassNames="w-[94.484px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Waitlist" additionalClassNames="w-[54.961px]" />
                    </BackgroundImage4>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[254.367px] items-start left-0 top-[543.95px] w-[442px]" data-name="Navigation">
                  <BackgroundImage6>{`Author & Press`}</BackgroundImage6>
                  <div className="content-stretch flex flex-col gap-[12px] h-[175.969px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="About Ash" additionalClassNames="w-[78.547px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <BackgroundImage2 additionalClassNames="w-[173.188px]">{`Speaking & Workshops`}</BackgroundImage2>
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Events" additionalClassNames="w-[50.867px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <BackgroundImage2 additionalClassNames="w-[107.414px]">{`Media & Press`}</BackgroundImage2>
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Contact" additionalClassNames="w-[60.141px]" />
                    </BackgroundImage4>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[216.773px] items-start left-0 top-[838.31px] w-[442px]" data-name="Navigation">
                  <BackgroundImageAndText text="Content" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[138.375px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Journal" additionalClassNames="w-[55.664px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Blog" additionalClassNames="w-[33.5px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Videos" additionalClassNames="w-[51.773px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Podcasts" additionalClassNames="w-[69.891px]" />
                    </BackgroundImage4>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[179.18px] items-start left-0 top-[1095.09px] w-[442px]" data-name="Navigation">
                  <BackgroundImageAndText text="Discover" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[100.781px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Search" additionalClassNames="w-[52.617px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Thank You" additionalClassNames="w-[79.57px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[442px]">
                      <ButtonBackgroundImageAndText1 text="Dev Tools" additionalClassNames="w-[74.211px]" />
                    </BackgroundImage4>
                  </div>
                </div>
              </div>
              <div className="h-[523px] relative shrink-0 w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-[#f8f8f8] border-solid border-t inset-0 pointer-events-none" />
                <div className="absolute content-stretch flex h-[200px] items-start left-[110.07px] top-[33px] w-[221.852px]" data-name="Container">
                  <BackgroundImage4 additionalClassNames="h-[200px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-[111px] not-italic text-[#6b6b6b] text-[12px] text-center top-0 whitespace-nowrap">© 2026 Ash Shaw. All Rights Reserved.</p>
                  </BackgroundImage4>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[42px] items-center justify-center left-[22px] top-[257px] w-[398px]" data-name="Container">
                  <div className="bg-[#fafafa] h-[42px] relative rounded-[9999px] shrink-0 w-[110px]" data-name="ThemeSwitcher">
                    <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center px-[5px] py-px relative size-full">
                      <ButtonBackgroundImage>
                        <BackgroundImage1>
                          <g clipPath="url(#clip0_4070_821)" id="IconBase">
                            <path d={svgPaths.peb9db00} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                          </g>
                          <defs>
                            <clipPath id="clip0_4070_821">
                              <rect fill="white" height="16" width="16" />
                            </clipPath>
                          </defs>
                        </BackgroundImage1>
                      </ButtonBackgroundImage>
                      <ButtonBackgroundImage additionalClassNames="bg-[#d4008c] shadow-[0px_0px_10px_0px_rgba(255,16,240,0.5)]">
                        <IconBaseBackgroundImage>
                          <path d={svgPaths.p894cf00} fill="var(--fill-0, white)" id="Vector" />
                        </IconBaseBackgroundImage>
                      </ButtonBackgroundImage>
                      <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[16px]" data-name="Button">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                          <IconBaseBackgroundImage>
                            <path d={svgPaths.pdd06300} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                          </IconBaseBackgroundImage>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BackgroundImage3 additionalClassNames="h-[36px] w-[236px]">
                    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4070_836)" id="Icon">
                          <path d={svgPaths.p3eb94a70} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4070_836">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[40px] overflow-clip size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4070_842)" id="Icon">
                          <path d={svgPaths.p38127b00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4070_842">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[80px] overflow-clip size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4070_845)" id="Icon">
                          <path d={svgPaths.p1f524b00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4070_845">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[120px] overflow-clip size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4070_830)" id="Icon">
                          <path d={svgPaths.p7d0ab00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4070_830">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[160px] overflow-clip size-[36px] top-0" data-name="Link">
                      <IconBackgroundImage>
                        <path d={svgPaths.p532d600} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                      </IconBackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[200px] overflow-clip size-[36px] top-0" data-name="Link">
                      <IconBackgroundImage>
                        <path d={svgPaths.p3869cc00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        <path d={svgPaths.p329f880} fill="var(--fill-0, #A3A3A3)" id="Vector_2" />
                      </IconBackgroundImage>
                    </div>
                  </BackgroundImage3>
                  <div className="relative shrink-0 size-[20px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                      <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="IconBase">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                          <div className="absolute inset-[12.49%_6.24%_12.5%_6.25%]" data-name="Vector">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.502 15.0011">
                              <path d={svgPaths.p8c3f580} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[200px] items-start justify-end left-[125.8px] top-[323px] w-[190.398px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[200px] w-[78.719px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-[39.5px] not-italic text-[#4a4a4a] text-[12px] text-center top-[90.4px] whitespace-nowrap">Privacy Policy</p>
                  </BackgroundImage3>
                  <BackgroundImage3 additionalClassNames="h-[200px] w-[95.68px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-[48px] not-italic text-[#4a4a4a] text-[12px] text-center top-[90.4px] whitespace-nowrap">Terms of Service</p>
                  </BackgroundImage3>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.95)] border-[#e5e5e5] border-b border-solid h-[102.188px] left-0 shadow-[0px_4px_15px_0px_rgba(255,58,174,0.2)] top-0 w-[482px]" data-name="Header">
        <div className="absolute content-stretch flex h-[69.188px] items-start left-[20px] top-[16px] w-[112.672px]" data-name="Container">
          <div className="bg-[rgba(255,255,255,0)] flex-[1_0_0] h-[69.188px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[#d4008c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_10px_0px_rgba(255,58,174,0.2)]" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular','Noto_Sans_Math:Regular',sans-serif] leading-[25.6px] left-[56.74px] not-italic text-[#d4008c] text-[16px] text-center top-[8.5px] tracking-[2px] uppercase w-[53px]">[ ≡ ] Menu</p>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex h-[25.594px] items-start justify-center left-[132.67px] top-[37.8px] w-[216.648px]" data-name="Container">
          <BackgroundImage3 additionalClassNames="h-[25.594px] w-[216.648px]">
            <p className="absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-0.5px] tracking-[1px] uppercase whitespace-nowrap">This one time on acid...</p>
          </BackgroundImage3>
        </div>
      </div>
    </div>
  );
}