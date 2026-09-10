import clsx from "clsx";
import svgPaths from "./svg-ou8lhl4afl";
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <div className={clsx("relative rounded-[16px] shrink-0 size-[32px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">{children}</div>
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
    <div className="h-[38.398px] relative shrink-0 w-full">
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 whitespace-nowrap">{children}</p>
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
type TextBackgroundImageAndText7Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText7({ text, additionalClassNames = "" }: TextBackgroundImageAndText7Props) {
  return (
    <div className={clsx("absolute h-[48px] top-[-16px] w-[5.4px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.27px] not-italic text-[#1a1a1a] text-[20px] top-[1.23px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText6Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText6({ text, additionalClassNames = "" }: TextBackgroundImageAndText6Props) {
  return (
    <div className={clsx("absolute h-[48px] top-[-16px] w-[15.3px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.63px] not-italic text-[#1a1a1a] text-[20px] top-[0.79px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText5Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText5({ text, additionalClassNames = "" }: TextBackgroundImageAndText5Props) {
  return (
    <div className={clsx("absolute h-[48px] top-[-16px] w-[6.3px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.61px] not-italic text-[#1a1a1a] text-[20px] top-[1.21px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText4Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText4({ text, additionalClassNames = "" }: TextBackgroundImageAndText4Props) {
  return (
    <div className={clsx("absolute h-[48px] top-[-16px] w-[5.4px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.2px] not-italic text-[#1a1a1a] text-[20px] top-[1.23px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText3({ text, additionalClassNames = "" }: TextBackgroundImageAndText3Props) {
  return (
    <div className={clsx("absolute h-[48px] top-[-16px] w-[13.5px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.5px] not-italic text-[#1a1a1a] text-[20px] top-[0.87px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText2({ text, additionalClassNames = "" }: TextBackgroundImageAndText2Props) {
  return (
    <div className={clsx("absolute h-[48px] top-[-16px] w-[11.7px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.63px] not-italic text-[#1a1a1a] text-[20px] top-[0.96px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText1({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute h-[25.594px] left-0 top-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[46.398px] left-[34px] top-[200.39px] w-[281px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#d4008c] text-[14px] top-[24.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[59.594px] items-center justify-center px-[33px] py-[17px] rounded-[4px] top-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[#1a1a1a] text-[16px] text-center whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[19.195px] left-0 top-0 w-[539.5px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#ff10f0] text-[12px] top-0 tracking-[2px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] rounded-[20px] top-0", additionalClassNames)}>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[43.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return <BackgroundImage2>{text}</BackgroundImage2>;
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <BackgroundImage3 additionalClassNames="h-[38.398px] w-[281px]">
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 whitespace-nowrap">{text}</p>
    </BackgroundImage3>
  );
}

export default function ThisOneTimeOnAcid() {
  return (
    <div className="bg-white relative size-full" data-name="This One Time on Acid">
      <div className="absolute bg-white h-[862px] left-0 top-0 w-[1159px]" data-name="RootLayout">
        <div className="absolute h-[6184.422px] left-0 top-[106.59px] w-[1159px]" data-name="BookHomePage">
          <div className="absolute bg-[#171722] h-[539.586px] left-0 top-[1156.73px] w-[1159px]" data-name="Section">
            <div className="absolute h-[19.195px] left-[179.5px] top-[96px] w-[800px]" data-name="Text">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.09px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">What it is</p>
            </div>
            <div className="absolute h-[112.422px] left-[179.5px] top-[131.2px] w-[800px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.21px] not-italic text-[46.84px] text-center text-white top-0 w-[784px]">A memoir. A guide. A neon map back to yourself.</p>
            </div>
            <div className="absolute h-[76.781px] left-[179.5px] top-[267.62px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.19px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[787px]">This one time on acid... is a hybrid memoir and creative-life guide built from a life lived across dancefloors, cities, bicycles, studios, festivals, businesses, and strange turning points. It brings together wild stories, subculture, identity, art, and lived lessons into one vivid body of work.</p>
            </div>
            <div className="absolute h-[51.188px] left-[179.5px] top-[368.4px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.11px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[794px]">This is not a polished success story. It is a raw, evolving book about becoming more visible, more honest, more creative, and more fully yourself.</p>
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] h-[513.992px] left-0 top-[1696.31px] w-[1159px]" data-name="Section">
            <div className="absolute h-[19.195px] left-[179.5px] top-[96px] w-[800px]" data-name="Text">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.48px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Why care</p>
            </div>
            <div className="absolute h-[112.422px] left-[179.5px] top-[131.2px] w-[800px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.23px] not-italic text-[#1a1a1a] text-[46.84px] text-center top-0 w-[761px]">Because the point is not just to survive your life. It is to live it fully.</p>
            </div>
            <div className="absolute h-[51.188px] left-[179.5px] top-[267.62px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.48px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[783px]">Beneath the stories of psytrance culture, travel, UV paint, and creative reinvention is a deeper question: how do you build a life that actually feels like yours?</p>
            </div>
            <div className="absolute h-[51.188px] left-[179.5px] top-[342.8px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.3px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[797px]">This book is for people who want more aliveness, more freedom, more belonging, and more permission to become who they already are.</p>
            </div>
          </div>
          <div className="absolute bg-[#171722] h-[670.359px] left-0 top-[2210.3px] w-[1159px]" data-name="Section">
            <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[223.18px] items-start left-[24px] pb-[2px] pl-[34px] pr-[2px] pt-[34px] rounded-[8px] top-[96px] w-[349px]" data-name="Container">
              <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
              <HeadingBackgroundImageAndText text="Stories" />
              <BackgroundImage3 additionalClassNames="h-[51.188px] w-[281px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] w-[251px]">Raw scenes from festivals, cities, movement, art, risk, and identity.</p>
              </BackgroundImage3>
            </div>
            <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[223.18px] items-start left-[405px] pb-[2px] pl-[34px] pr-[2px] pt-[34px] rounded-[8px] top-[96px] w-[349px]" data-name="Container">
              <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
              <HeadingBackgroundImageAndText text="Lessons" />
              <BackgroundImage3 additionalClassNames="h-[76.781px] w-[281px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] w-[260px]">Hard-won insights on freedom, visibility, creativity, belonging, and courage.</p>
              </BackgroundImage3>
            </div>
            <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[223.18px] items-start left-[786px] pb-[2px] pl-[34px] pr-[2px] pt-[34px] rounded-[8px] top-[96px] w-[349px]" data-name="Container">
              <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
              <HeadingBackgroundImageAndText text="Energy" />
              <BackgroundImage3 additionalClassNames="h-[51.188px] w-[281px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] w-[271px]">A cult, neon, psychedelic world that feels alive on the page.</p>
              </BackgroundImage3>
            </div>
            <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[223.18px] items-start left-[24px] pb-[2px] pl-[34px] pr-[2px] pt-[34px] rounded-[8px] top-[351.18px] w-[349px]" data-name="Container">
              <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
              <HeadingBackgroundImageAndText text="Permission" />
              <BackgroundImage3 additionalClassNames="h-[76.781px] w-[281px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] w-[268px]">A reminder that difference can become direction, and standing out can become a way of life.</p>
              </BackgroundImage3>
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] h-[654.789px] left-0 top-[2880.66px] w-[1159px]" data-name="Section">
            <div className="absolute h-[19.195px] left-[179.5px] top-[96px] w-[800px]" data-name="Text">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.14px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Why Ash</p>
            </div>
            <div className="absolute h-[112.422px] left-[179.5px] top-[131.2px] w-[800px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.36px] not-italic text-[#1a1a1a] text-[46.84px] text-center top-0 w-[626px]">Written by someone who has actually lived the overlap.</p>
            </div>
            <div className="absolute h-[76.781px] left-[179.5px] top-[267.62px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.44px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[764px]">Ash Shaw is a South African writer, UV makeup artist, founder, cyclist, speaker, traveller, and lifelong builder of communities. His first book brings together decades of lived experience across subculture, entrepreneurship, movement, creativity, and radical self-expression.</p>
            </div>
            <div className="absolute h-[25.594px] left-[179.5px] top-[368.4px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.23px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] whitespace-nowrap">This is not theory from a distance. It is a life observed from the inside.</p>
            </div>
            <div className="absolute h-[92.797px] left-[179.5px] top-[441.99px] w-[800px]" data-name="Container">
              <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] left-[60.11px] rounded-[20px] top-0 w-[131.266px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[65px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Writer / Author</p>
              </div>
              <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] left-[203.38px] rounded-[20px] top-0 w-[93.766px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[46px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">UV Artist</p>
              </div>
              <TextBackgroundImageAndText text="Founder" additionalClassNames="left-[309.14px] w-[88.391px]" />
              <TextBackgroundImageAndText text="Speaker" additionalClassNames="left-[409.53px] w-[88.172px]" />
              <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] left-[509.7px] rounded-[20px] top-0 w-[78.57px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[38.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Cyclist</p>
              </div>
              <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] left-[600.27px] rounded-[20px] top-0 w-[139.617px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[69px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Festival Veteran</p>
              </div>
              <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] left-[241.29px] rounded-[20px] top-[52.4px] w-[146.125px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[72.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Creative Director</p>
              </div>
              <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[40.398px] left-[399.41px] rounded-[20px] top-[52.4px] w-[159.289px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[79px] not-italic text-[#1a1a1a] text-[14px] text-center top-[8.5px] whitespace-nowrap">Community Builder</p>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#171722] content-stretch flex flex-col h-[901.969px] items-start left-0 pt-[96px] px-[179.5px] top-[3535.45px] w-[1159px]" data-name="Section">
            <div className="bg-gradient-to-b from-[#171722] h-[709.969px] relative rounded-[8px] shrink-0 to-[rgba(18,18,26,0.5)] w-full" data-name="Container">
              <div className="overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute h-[19.195px] left-[50px] top-[50px] w-[700px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[350.2px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Read early</p>
                </div>
                <div className="absolute h-[112.422px] left-[50px] top-[85.2px] w-[700px]" data-name="Heading 2">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[350.41px] not-italic text-[46.84px] text-center text-white top-0 w-[699px]">The rough draft is open to early readers.</p>
                </div>
                <div className="absolute h-[51.188px] left-[50px] top-[221.62px] w-[700px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[350.08px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[688px]">The book is still in progress. Some chapters are finished. Others are still being lived. That is part of the point.</p>
                </div>
                <div className="absolute h-[25.594px] left-[50px] top-[296.8px] w-[700px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[350.38px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] whitespace-nowrap">Enter your email to unlock the draft preview and follow the making of the book as it evolves.</p>
                </div>
                <div className="absolute bg-[rgba(15,15,15,0.8)] content-stretch flex flex-col gap-[16px] h-[215.977px] items-start left-[50px] pb-[2px] pl-[34px] pr-[2px] pt-[34px] rounded-[8px] top-[354.4px] w-[700px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                  <BackgroundImage3 additionalClassNames="h-[19.195px] w-[632px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#50c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Draft preview</p>
                  </BackgroundImage3>
                  <div className="h-[88.781px] relative shrink-0 w-[632px]" data-name="List">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pl-[20px] relative size-full">
                      <BackgroundImage3 additionalClassNames="h-[25.594px] w-[612px]">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] whitespace-nowrap">Stories, lessons, and the making of a neon soul</p>
                      </BackgroundImage3>
                      <BackgroundImage4 additionalClassNames="w-[612px]">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] w-[548px]">Childhood, neurodivergence, festivals, Berlin, bicycles, UV paint, and the cumulative effect of a life lived in full colour</p>
                      </BackgroundImage4>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[57.594px] left-[306.51px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-[602.38px] w-[186.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.88deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[93px] not-italic text-[16px] text-center text-white top-[15.5px] whitespace-nowrap">Unlock the Draft</p>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[636.414px] left-0 px-[24px] py-[96px] top-[4437.42px] w-[1159px]" data-name="Section">
            <div className="col-1 h-[444.414px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
              <TextBackgroundImageAndText1 text="Beyond the page" />
              <div className="absolute h-[168.633px] left-0 top-[35.2px] w-[539.5px]" data-name="Heading 2">
                <p className="absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-0 not-italic text-[#1a1a1a] text-[46.84px] top-0 w-[441px]">A book built to be spoken, shared, and experienced live.</p>
              </div>
              <div className="absolute h-[76.781px] left-0 top-[227.83px] w-[539.5px]" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[538px]">The site should make room for future talks, workshops, readings, festival appearances, podcasts, and media conversations. Show this as an active, expandable ecosystem around the book.</p>
              </div>
              <div className="absolute h-[59.594px] left-0 top-[328.61px] w-[539.5px]" data-name="Container">
                <ButtonBackgroundImageAndText text="View events" additionalClassNames="left-0 w-[153.625px]" />
                <ButtonBackgroundImageAndText text="Book a talk" additionalClassNames="left-[169.63px] w-[151.625px]" />
                <ButtonBackgroundImageAndText text="Explore media" additionalClassNames="left-[337.25px] w-[169.578px]" />
              </div>
            </div>
            <div className="col-2 h-[444.414px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
              <TextBackgroundImageAndText1 text="Speaking" />
              <div className="absolute h-[224.844px] left-0 top-[35.2px] w-[539.5px]" data-name="Heading 2">
                <p className="absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-0 not-italic text-[#1a1a1a] text-[46.84px] top-0 w-[538px]">Talks and workshops for creative communities, festivals, teams, and curious humans.</p>
              </div>
              <div className="absolute h-[76.781px] left-0 top-[284.04px] w-[539.5px]" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[529px]">The themes of the book naturally extend into live conversations about creativity, difference, identity, freedom, courage, community, and building a life that funds the work.</p>
              </div>
              <div className="absolute h-[59.594px] left-0 top-[384.82px] w-[539.5px]" data-name="Container">
                <ButtonBackgroundImageAndText text="Enquire about speaking" additionalClassNames="left-0 w-[242.406px]" />
              </div>
            </div>
          </div>
          <div className="absolute bg-[#171722] content-stretch flex flex-col h-[695.594px] items-start left-0 pt-[96px] px-[24px] top-[5073.84px] w-[1159px]" data-name="Section">
            <div className="h-[222.805px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute h-[19.195px] left-0 top-0 w-[1111px]" data-name="Text">
                <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[556.49px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">Journal</p>
              </div>
              <div className="absolute h-[112.422px] left-0 top-[35.2px] w-[1111px]" data-name="Heading 2">
                <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[555.96px] not-italic text-[46.84px] text-center text-white top-0 w-[1099px]">Notes, field reports, videos, and companion pieces from the world of the book.</p>
              </div>
              <div className="absolute h-[51.188px] left-[155.5px] top-[171.62px] w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.23px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[792px]">The Journal is where blog posts, podcasts, videos, and related reflections live together. It should feel like an editorial companion to the book, not a separate content silo.</p>
              </div>
            </div>
            <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[280.789px] relative shrink-0 w-full" data-name="Container">
              <div className="bg-[rgba(15,15,15,0.8)] col-1 h-[280.789px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Container">
                <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <div className="content-stretch flex flex-col gap-[16px] items-start pl-[34px] pr-[2px] py-[34px] relative size-full">
                  <BackgroundImage3 additionalClassNames="h-[19.195px] w-[281px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#8c7a00] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Essay</p>
                  </BackgroundImage3>
                  <BackgroundImage4 additionalClassNames="w-[281px]">
                    <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[229px]">What the dancefloor taught me about belonging</p>
                  </BackgroundImage4>
                  <BackgroundImage3 additionalClassNames="h-[46.398px] w-[281px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#d4008c] text-[14px] top-[24.5px] whitespace-nowrap">Read piece →</p>
                  </BackgroundImage3>
                </div>
              </div>
              <div className="bg-[rgba(15,15,15,0.8)] col-2 h-[280.789px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Container">
                <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <div className="absolute h-[19.195px] left-[34px] top-[34px] w-[281px]" data-name="Text">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#39ff14] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Video</p>
                </div>
                <div className="absolute h-[76.797px] left-[34px] top-[69.2px] w-[281px]" data-name="Heading 3">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[258px]">UV paint and becoming visible</p>
                </div>
                <BackgroundImageAndText1 text="Watch video →" />
              </div>
              <div className="bg-[rgba(15,15,15,0.8)] col-3 h-[280.789px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Container">
                <div aria-hidden="true" className="absolute border-2 border-[rgba(255,16,240,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)]" />
                <div className="absolute h-[19.195px] left-[34px] top-[34px] w-[281px]" data-name="Text">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#d4008c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">Podcast</p>
                </div>
                <div className="absolute h-[76.797px] left-[34px] top-[69.2px] w-[281px]" data-name="Heading 3">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[24px] text-white top-0 w-[232px]">Notes on living in full colour</p>
                </div>
                <BackgroundImageAndText1 text="Listen →" />
              </div>
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] h-[414.992px] left-0 top-[5769.43px] w-[1159px]" data-name="Section">
            <div className="absolute h-[56.211px] left-[179.5px] top-[96px] w-[800px]" data-name="Heading 2">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[56.208px] left-[400.77px] not-italic text-[#1a1a1a] text-[46.84px] text-center top-0 whitespace-nowrap">Start reading the rough draft.</p>
            </div>
            <div className="absolute h-[51.188px] left-[179.5px] top-[176.21px] w-[800px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[400.35px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[769px]">Enter your email for early access, future chapter drops, launch news, and first notice when pre-orders open.</p>
            </div>
            <div className="absolute h-[59.594px] left-[179.5px] top-[259.4px] w-[800px]" data-name="Container">
              <div className="absolute content-stretch flex h-[59.594px] items-center justify-center left-[206.31px] px-[32px] py-[16px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-0 w-[186.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.322deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
              </div>
              <ButtonBackgroundImageAndText text="Join the Waitlist" additionalClassNames="left-[409.3px] w-[184.383px]" />
            </div>
          </div>
          <div className="absolute bg-[#f0f0f0] content-stretch flex h-[1156.727px] items-center left-0 overflow-clip px-[24px] top-0 w-[1159px]" data-name="Section">
            <BackgroundImage4 additionalClassNames="h-[916.727px]">
              <div className="absolute h-[916.727px] left-0 top-0 w-[571.086px]" data-name="Container">
                <div className="absolute h-[19.195px] left-[184.21px] top-0 w-[202.656px]" data-name="Text">
                  <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[101.5px] not-italic text-[#ff10f0] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">First book by Ash Shaw</p>
                </div>
                <div className="absolute h-[154.563px] left-0 top-[83.2px] w-[571.086px]" data-name="Heading 1">
                  <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[77.286px] left-[285.8px] not-italic text-[#1a1a1a] text-[70.26px] text-center top-0 w-[528px]">This one time on acid...</p>
                </div>
                <div className="absolute h-[105.398px] left-0 top-[309.76px] w-[571.086px]" data-name="Heading 2">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[35.13px] left-[286.02px] not-italic text-[#4a4a4a] text-[23.42px] text-center top-[0.5px] w-[534px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                </div>
                <div className="absolute h-[51.188px] left-0 top-[487.16px] w-[571.086px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[285.71px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] w-[556px]">For misfits, makers, dancers, seekers, festival people, and anyone wired a little differently.</p>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[59.594px] items-end left-[77.05px] top-[642.34px] w-[416.984px]" data-name="Form">
                  <div className="flex-[1_0_0] h-[59.594px] min-h-px min-w-px relative" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[214px]" data-name="Email Input">
                        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-[16px] relative size-full">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#a3a3a3] text-[16px] whitespace-nowrap">Email address</p>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[57.594px] relative rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] shrink-0 w-[186.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.88deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[32px] py-[16px] relative size-full">
                      <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[19.195px] left-[4.66px] top-[765.94px] w-[561.75px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-[281px] not-italic text-[#4a4a4a] text-[12px] text-center top-0 whitespace-nowrap">Enter your email to read the rough draft, get chapter updates, and hear first when pre-orders open.</p>
                </div>
                <div className="absolute h-[59.594px] left-[193.35px] top-[857.13px] w-[184.383px]" data-name="Container">
                  <ButtonBackgroundImageAndText text="Join the Waitlist" additionalClassNames="left-0 w-[184.383px]" />
                </div>
              </div>
              <div className="absolute h-[634.547px] left-[635.09px] rounded-[8px] top-[141.09px] w-[475.914px]" data-name="Container" style={{ backgroundImage: "linear-gradient(126.87deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                <div className="content-stretch flex flex-col gap-[64.885px] items-center justify-center overflow-clip pb-[200.484px] pt-[193.361px] px-px relative rounded-[inherit] size-full">
                  <div className="flex h-[137.234px] items-center justify-center relative shrink-0 w-[414.043px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "57" } as React.CSSProperties}>
                    <div className="-rotate-2 flex-none">
                      <BackgroundImage5 additionalClassNames="h-[123px] relative w-[410px]">
                        <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[61.6px] left-[206.85px] not-italic text-[#1a1a1a] text-[56px] text-center top-[-11.98px] w-[344px]">{`This one time on `}</p>
                        <div className="absolute content-stretch flex h-[73.313px] items-start left-[167.68px] shadow-[0px_0px_24px_0px_rgba(255,16,240,0.4)] top-[57.25px] w-[112.827px]" data-name="Text">
                          <p className="bg-clip-text font-['Righteous:Regular',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[56px] text-[transparent] text-center whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(255, 16, 240) 0%, rgb(190, 0, 254) 25%, rgb(0, 247, 255) 50%, rgb(57, 255, 20) 75%, rgb(244, 255, 60) 100%)" }}>
                            acid
                          </p>
                        </div>
                        <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[61.6px] left-[301.32px] not-italic text-[#1a1a1a] text-[56px] text-center top-[59.99px] whitespace-nowrap">...</p>
                      </BackgroundImage5>
                    </div>
                  </div>
                  <BackgroundImage3 additionalClassNames="h-[38.398px] w-[202.758px]">
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-[101.5px] not-italic text-[#4a4a4a] text-[24px] text-center top-0 tracking-[4px] uppercase whitespace-nowrap">by Ash Shaw</p>
                  </BackgroundImage3>
                </div>
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_20px_50px_0px_rgba(0,0,0,0.5),0px_0px_30px_0px_rgba(255,16,240,0.4)]" />
              </div>
            </BackgroundImage4>
          </div>
        </div>
        <div className="absolute bg-[#171722] h-[623.961px] left-0 top-[6291.02px] w-[1159px]" data-name="Footer">
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[97px] px-[24px] relative rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[64px] h-[430.961px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="h-[291.961px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute content-stretch flex flex-col gap-[52px] h-[291.961px] items-start left-0 top-0 w-[338.328px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[38.398px] w-[338.328px]">
                    <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[#8c7a00] text-[24px] top-0 whitespace-nowrap">This one time on acid...</p>
                  </BackgroundImage3>
                  <BackgroundImage3 additionalClassNames="h-[81.586px] w-[338.328px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27.2px] left-0 not-italic text-[#6b6b6b] text-[16px] top-[-0.5px] w-[334px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                  </BackgroundImage3>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[362.33px] top-0 w-[169.172px]" data-name="Navigation">
                  <BackgroundImageAndText text="The Book" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[213.563px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Home" additionalClassNames="w-[44.617px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="The Book" additionalClassNames="w-[71.75px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Read the Draft" additionalClassNames="w-[110.25px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Ebook Reader" additionalClassNames="w-[105.484px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Draft Viewer" additionalClassNames="w-[94.484px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Waitlist" additionalClassNames="w-[54.961px]" />
                    </BackgroundImage4>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[555.5px] top-0 w-[169.164px]" data-name="Navigation">
                  <BackgroundImage2>{`Author & Press`}</BackgroundImage2>
                  <div className="content-stretch flex flex-col gap-[12px] h-[201.563px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="About Ash" additionalClassNames="w-[78.547px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[169.164px]">
                      <div className="absolute h-[51.188px] left-0 top-0 w-[169.164px]" data-name="Button">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] w-[85px]">{`Speaking & Workshops`}</p>
                      </div>
                    </BackgroundImage4>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="Events" additionalClassNames="w-[50.867px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <div className="absolute h-[25.594px] left-0 top-0 w-[107.414px]" data-name="Button">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#f6f2eb] text-[16px] top-[-1px] whitespace-nowrap">{`Media & Press`}</p>
                      </div>
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="Contact" additionalClassNames="w-[60.141px]" />
                    </BackgroundImage3>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[748.66px] top-0 w-[169.164px]" data-name="Navigation">
                  <BackgroundImageAndText text="Content" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[138.375px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="Journal" additionalClassNames="w-[55.664px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="Blog" additionalClassNames="w-[33.5px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="Videos" additionalClassNames="w-[51.773px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[169.164px]">
                      <ButtonBackgroundImageAndText1 text="Podcasts" additionalClassNames="w-[69.891px]" />
                    </BackgroundImage4>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[941.83px] top-0 w-[169.172px]" data-name="Navigation">
                  <BackgroundImageAndText text="Discover" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[100.781px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Search" additionalClassNames="w-[52.617px]" />
                    </BackgroundImage3>
                    <BackgroundImage3 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Thank You" additionalClassNames="w-[79.57px]" />
                    </BackgroundImage3>
                    <BackgroundImage4 additionalClassNames="w-[169.172px]">
                      <ButtonBackgroundImageAndText1 text="Dev Tools" additionalClassNames="w-[74.211px]" />
                    </BackgroundImage4>
                  </div>
                </div>
              </div>
              <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-[#f8f8f8] border-solid border-t inset-0 pointer-events-none" />
                <div className="absolute content-stretch flex h-[19.195px] items-start left-0 top-[44.4px] w-[332.5px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[19.195px] w-[221.852px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#6b6b6b] text-[12px] top-0 whitespace-nowrap">© 2026 Ash Shaw. All Rights Reserved.</p>
                  </BackgroundImage3>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[42px] items-center justify-center left-[356.5px] top-[33px] w-[398px]" data-name="Container">
                  <div className="bg-[#fafafa] h-[42px] relative rounded-[9999px] shrink-0 w-[110px]" data-name="ThemeSwitcher">
                    <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center px-[5px] py-px relative size-full">
                      <BackgroundImage6>
                        <BackgroundImage1>
                          <g clipPath="url(#clip0_4105_787)" id="IconBase">
                            <path d={svgPaths.peb9db00} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                          </g>
                          <defs>
                            <clipPath id="clip0_4105_787">
                              <rect fill="white" height="16" width="16" />
                            </clipPath>
                          </defs>
                        </BackgroundImage1>
                      </BackgroundImage6>
                      <BackgroundImage6 additionalClassNames="bg-[#d4008c] shadow-[0px_0px_10px_0px_rgba(255,16,240,0.5)]">
                        <IconBaseBackgroundImage>
                          <path d={svgPaths.p894cf00} fill="var(--fill-0, white)" id="Vector" />
                        </IconBaseBackgroundImage>
                      </BackgroundImage6>
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
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4105_802)" id="Icon">
                          <path d={svgPaths.p3eb94a70} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4105_802">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[40px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4105_808)" id="Icon">
                          <path d={svgPaths.p38127b00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4105_808">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[80px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4105_811)" id="Icon">
                          <path d={svgPaths.p1f524b00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4105_811">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[120px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4105_796)" id="Icon">
                          <path d={svgPaths.p7d0ab00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4105_796">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[160px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <IconBackgroundImage>
                        <path d={svgPaths.p532d600} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                      </IconBackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[200px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <IconBackgroundImage>
                        <path d={svgPaths.p3869cc00} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                        <path d={svgPaths.p329f880} fill="var(--fill-0, #A3A3A3)" id="Vector_2" />
                      </IconBackgroundImage>
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
                <div className="absolute content-stretch flex gap-[16px] h-[25.594px] items-start justify-end left-[778.5px] top-[41.2px] w-[332.5px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[25.594px] w-[104.961px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[52.5px] not-italic text-[#f6f2eb] text-[16px] text-center top-[-1px] whitespace-nowrap">Privacy Policy</p>
                  </BackgroundImage3>
                  <BackgroundImage3 additionalClassNames="h-[25.594px] w-[127.57px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[64px] not-italic text-[#f6f2eb] text-[16px] text-center top-[-1px] whitespace-nowrap">Terms of Service</p>
                  </BackgroundImage3>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.95)] border-[#e5e5e5] border-b border-solid h-[106.594px] left-0 top-0 w-[1159px]" data-name="Header">
        <div className="absolute content-stretch flex h-[43.594px] items-start left-[24px] top-[31px] w-[406.906px]" data-name="Container">
          <div className="bg-[rgba(255,255,255,0)] h-[43.594px] relative rounded-[4px] shrink-0 w-[132.969px]" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[#d4008c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_10px_0px_rgba(255,58,174,0.2)]" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <p className="-translate-x-1/2 absolute font-['Righteous:Regular','Noto_Sans_Math:Regular',sans-serif] leading-[25.6px] left-[66.5px] not-italic text-[#d4008c] text-[16px] text-center top-[8.5px] tracking-[2px] uppercase whitespace-nowrap">[ ≡ ] Menu</p>
            </div>
          </div>
        </div>
        <div className="absolute h-[32px] left-[430.91px] top-[36.8px] w-[297.188px]" data-name="Container">
          <div className="absolute flex h-[52.64px] items-center justify-center left-[-1.02px] top-[-20.69px] w-[298.509px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "456" } as React.CSSProperties}>
            <div className="-rotate-4 flex-none">
              <div className="h-[32px] relative w-[297px]" data-name="Link">
                <TextBackgroundImageAndText2 text="T" additionalClassNames="left-[16.34px]" />
                <TextBackgroundImageAndText3 text="h" additionalClassNames="left-[29.12px]" />
                <TextBackgroundImageAndText4 text="i" additionalClassNames="left-[43.78px]" />
                <div className="absolute h-[48px] left-[50.44px] top-[-16px] w-[11.7px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.3px] not-italic text-[#1a1a1a] text-[20px] top-[0.94px] tracking-[1px] uppercase whitespace-nowrap">s</p>
                </div>
                <TextBackgroundImageAndText5 text="&nbsp;" additionalClassNames="left-[63.05px]" />
                <TextBackgroundImageAndText6 text="o" additionalClassNames="left-[70.13px]" />
                <TextBackgroundImageAndText3 text="n" additionalClassNames="left-[86.71px]" />
                <TextBackgroundImageAndText2 text="e" additionalClassNames="left-[101.3px]" />
                <TextBackgroundImageAndText5 text="&nbsp;" additionalClassNames="left-[113.58px]" />
                <TextBackgroundImageAndText2 text="t" additionalClassNames="left-[120.46px]" />
                <TextBackgroundImageAndText4 text="i" additionalClassNames="left-[133.1px]" />
                <div className="absolute h-[48px] left-[140.05px] top-[-16px] w-[15.3px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.21px] not-italic text-[#1a1a1a] text-[20px] top-[0.77px] tracking-[1px] uppercase whitespace-nowrap">m</p>
                </div>
                <TextBackgroundImageAndText2 text="e" additionalClassNames="left-[156.83px]" />
                <TextBackgroundImageAndText5 text="&nbsp;" additionalClassNames="left-[169.11px]" />
                <TextBackgroundImageAndText6 text="o" additionalClassNames="left-[176.19px]" />
                <TextBackgroundImageAndText3 text="n" additionalClassNames="left-[192.78px]" />
                <TextBackgroundImageAndText5 text="&nbsp;" additionalClassNames="left-[207.08px]" />
                <div className="absolute h-[48px] left-[214.47px] top-[-16px] w-[12.6px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.17px] not-italic text-[#1a1a1a] text-[20px] top-[0.9px] tracking-[1px] uppercase whitespace-nowrap">a</p>
                </div>
                <div className="absolute h-[48px] left-[228.61px] top-[-16px] w-[12.6px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.5px] not-italic text-[#1a1a1a] text-[20px] top-[0.91px] tracking-[1px] uppercase whitespace-nowrap">c</p>
                </div>
                <TextBackgroundImageAndText4 text="i" additionalClassNames="left-[242.32px]" />
                <div className="absolute h-[48px] left-[248.96px] top-[-16px] w-[12.6px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.37px] not-italic text-[#1a1a1a] text-[20px] top-[0.9px] tracking-[1px] uppercase whitespace-nowrap">d</p>
                </div>
                <TextBackgroundImageAndText7 text="." additionalClassNames="left-[262.73px]" />
                <TextBackgroundImageAndText7 text="." additionalClassNames="left-[269px]" />
                <TextBackgroundImageAndText7 text="." additionalClassNames="left-[275.26px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[57.594px] left-[728.09px] top-[24px] w-[406.906px]" data-name="Container">
          <div className="absolute content-stretch flex h-[57.594px] items-center justify-center left-[219.92px] px-[32px] py-[16px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-0 w-[186.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.88deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
            <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
          </div>
          <div className="absolute bg-[rgba(15,15,15,0.8)] left-[163.92px] rounded-[22px] size-[44px] top-[6.8px]" data-name="ThemeToggleES5">
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
      </div>
    </div>
  );
}