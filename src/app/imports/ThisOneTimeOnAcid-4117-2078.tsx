import clsx from "clsx";
import svgPaths from "./svg-lf6ep9lpoa";
type BackgroundImage9Props = {
  additionalClassNames?: string;
};

function BackgroundImage9({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage9Props>) {
  return (
    <div className={clsx("relative rounded-[16px] shrink-0 size-[32px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[500px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className={clsx("bg-[#0f0f0f] relative rounded-[8px] w-[775px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("bg-[#0f0f0f] relative rounded-[8px] w-[775px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-px pt-[33px] px-[33px] relative size-full">{children}</div>
    </div>
  );
}
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("absolute bg-[#0f0f0f] h-[305.359px] rounded-[8px] w-[375.5px]", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,16,240,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundImage8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[74.211px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(255,16,240,0.2)] border-b-2 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[56.208px] left-0 not-italic text-[#FF10F0] text-[35.13px] top-[-0.5px] whitespace-nowrap">{children}</p>
    </div>
  );
}
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return <BackgroundImage7 additionalClassNames={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>{children}</BackgroundImage7>;
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage7 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage7>;
}

function BackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[38.398px] relative shrink-0 w-full">
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[#8c7a00] text-[24px] top-0 whitespace-nowrap">{children}</p>
    </div>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute border border-[rgba(255,16,240,0.2)] border-solid h-[48.398px] left-0 rounded-[4px] top-0 w-[240px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[16px] not-italic text-[#FFFFFF] text-[14px] top-[12.5px] whitespace-nowrap">{children}</p>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
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

function IconBaseBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="IconBase">{children}</g>
    </BackgroundImage1>
  );
}

function IconBaseBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage2>
      <g id="IconBase">{children}</g>
    </BackgroundImage2>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return <BackgroundImage3>{text}</BackgroundImage3>;
}
type TextBackgroundImageAndText18Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText18({ text, additionalClassNames = "" }: TextBackgroundImageAndText18Props) {
  return (
    <div className={clsx("absolute h-[48px] top-0 w-[5.4px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.27px] not-italic text-[#1a1a1a] text-[20px] top-[1.23px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText17Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText17({ text, additionalClassNames = "" }: TextBackgroundImageAndText17Props) {
  return (
    <div className={clsx("absolute h-[48px] top-0 w-[15.3px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.63px] not-italic text-[#1a1a1a] text-[20px] top-[0.79px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText16Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText16({ text, additionalClassNames = "" }: TextBackgroundImageAndText16Props) {
  return (
    <div className={clsx("absolute h-[48px] top-0 w-[6.3px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.61px] not-italic text-[#1a1a1a] text-[20px] top-[1.21px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText15Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText15({ text, additionalClassNames = "" }: TextBackgroundImageAndText15Props) {
  return (
    <div className={clsx("absolute h-[48px] top-0 w-[5.4px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.2px] not-italic text-[#1a1a1a] text-[20px] top-[1.23px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText14Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText14({ text, additionalClassNames = "" }: TextBackgroundImageAndText14Props) {
  return (
    <div className={clsx("absolute h-[48px] top-0 w-[13.5px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.5px] not-italic text-[#1a1a1a] text-[20px] top-[0.87px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText13Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText13({ text, additionalClassNames = "" }: TextBackgroundImageAndText13Props) {
  return (
    <div className={clsx("absolute h-[48px] top-0 w-[11.7px]", additionalClassNames)}>
      <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.63px] not-italic text-[#1a1a1a] text-[20px] top-[0.96px] tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText4Props = {
  text: string;
};

function BackgroundImageAndText4({ text }: BackgroundImageAndText4Props) {
  return <BackgroundImage4>{text}</BackgroundImage4>;
}
type ListItemBackgroundImageAndTextProps = {
  text: string;
};

function ListItemBackgroundImageAndText({ text }: ListItemBackgroundImageAndTextProps) {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText12Props = {
  text: string;
};

function TextBackgroundImageAndText12({ text }: TextBackgroundImageAndText12Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[99.344px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[50px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText11Props = {
  text: string;
};

function TextBackgroundImageAndText11({ text }: TextBackgroundImageAndText11Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[19.875px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[10.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText10Props = {
  text: string;
};

function TextBackgroundImageAndText10({ text }: TextBackgroundImageAndText10Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[92.719px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[46.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText9Props = {
  text: string;
};

function TextBackgroundImageAndText9({ text }: TextBackgroundImageAndText9Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[72.852px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[36.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText8Props = {
  text: string;
};

function TextBackgroundImageAndText8({ text }: TextBackgroundImageAndText8Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[39.742px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[20.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText7Props = {
  text: string;
};

function TextBackgroundImageAndText7({ text }: TextBackgroundImageAndText7Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[46.359px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[23px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText6Props = {
  text: string;
};

function TextBackgroundImageAndText6({ text }: TextBackgroundImageAndText6Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[33.117px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[17px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText5Props = {
  text: string;
};

function TextBackgroundImageAndText5({ text }: TextBackgroundImageAndText5Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[66.227px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[33px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText4Props = {
  text: string;
};

function TextBackgroundImageAndText4({ text }: TextBackgroundImageAndText4Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[26.492px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[13.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
};

function TextBackgroundImageAndText3({ text }: TextBackgroundImageAndText3Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[59.609px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[30.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[52.984px]">
      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[26px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type HeadingBackgroundImageAndText5Props = {
  text: string;
};

function HeadingBackgroundImageAndText5({ text }: HeadingBackgroundImageAndText5Props) {
  return (
    <div className="h-[47.398px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[38.4px] left-0 not-italic text-[#12121a] text-[24px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute bg-[#f0f0f0] border border-[#e5e5e5] border-solid h-[40.398px] rounded-[20px] top-[33px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[16px] not-italic text-[#1a1a1a] text-[14px] top-[8.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndText4Props = {
  text: string;
};

function HeadingBackgroundImageAndText4({ text }: HeadingBackgroundImageAndText4Props) {
  return (
    <div className="absolute h-[24px] left-[32px] top-[67.2px] w-[309.5px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1a1a1a] text-[24px] top-[-1px] tracking-[-0.48px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[19.195px] left-[32px] top-[32px] w-[309.5px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#50c] text-[12px] top-0 tracking-[1px] uppercase whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextInputBackgroundImageAndTextProps = {
  text: string;
};

function TextInputBackgroundImageAndText({ text }: TextInputBackgroundImageAndTextProps) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[500px]">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#a3a3a3] text-[16px] whitespace-nowrap">{text}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}
type BackgroundImageAndText3Props = {
  text: string;
};

function BackgroundImageAndText3({ text }: BackgroundImageAndText3Props) {
  return (
    <div className="absolute h-[22.398px] left-[32px] top-[91.2px] w-[309.5px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#4a4a4a] text-[14px] top-[0.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type LabelBackgroundImageAndTextProps = {
  text: string;
};

function LabelBackgroundImageAndText({ text }: LabelBackgroundImageAndTextProps) {
  return (
    <BackgroundImage5 additionalClassNames="h-[22.398px] w-[500px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#4a4a4a] text-[14px] top-[0.5px] whitespace-nowrap">{text}</p>
    </BackgroundImage5>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText1({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute h-[19.195px] left-[33px] w-[709px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#9c9488] text-[12px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndText3Props = {
  text: string;
};

function HeadingBackgroundImageAndText3({ text }: HeadingBackgroundImageAndText3Props) {
  return (
    <div className="absolute h-[32px] left-[33px] top-[33px] w-[709px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[#12121a] text-[20px] top-[-0.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#6b6b6b] text-[12px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="h-[19.195px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#6b6b6b] text-[12px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndText2Props = {
  text: string;
};

function HeadingBackgroundImageAndText2({ text }: HeadingBackgroundImageAndText2Props) {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#12121a] text-[16px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[21px] left-[20px] top-[134.36px] w-[333.5px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#cfc7bb] text-[14px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type CodeBackgroundImageAndText1Props = {
  text: string;
};

function CodeBackgroundImageAndText1({ text }: CodeBackgroundImageAndText1Props) {
  return (
    <div className="absolute bg-[#f5f5f5] border border-[#e5e5e5] border-solid h-[30.781px] left-[20px] rounded-[3px] top-[91.58px] w-[333.5px]">
      <p className="absolute font-['Space_Mono:Regular',sans-serif] leading-[23.04px] left-[5.76px] not-italic text-[#1a1a1a] text-[14.4px] top-[4.88px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type CodeBackgroundImageAndTextProps = {
  text: string;
};

function CodeBackgroundImageAndText({ text }: CodeBackgroundImageAndTextProps) {
  return (
    <div className="absolute bg-[#f5f5f5] border border-[#e5e5e5] border-solid h-[30.781px] left-[20px] rounded-[3px] top-[56.8px] w-[333.5px]">
      <p className="absolute font-['Space_Mono:Bold',sans-serif] leading-[23.04px] left-[5.76px] not-italic text-[#1a1a1a] text-[14.4px] top-[4.88px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndText1Props = {
  text: string;
};

function HeadingBackgroundImageAndText1({ text }: HeadingBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[28.797px] left-[20px] top-[20px] w-[333.5px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] left-0 not-italic text-[#12121a] text-[18px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[25.594px] left-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return <BackgroundImage8>{text}</BackgroundImage8>;
}

export default function ThisOneTimeOnAcid() {
  return (
    <div className="bg-[#0f0f0f] relative size-full" data-name="This One Time on Acid">
      <div className="absolute bg-[#0f0f0f] h-[862px] left-0 top-0 w-[1159px]" data-name="RootLayout">
        <div className="absolute h-[22.398px] left-[20px] top-[114.59px] w-[760px]" data-name="Breadcrumbs">
          <div className="absolute content-stretch flex gap-[6px] h-[22.398px] items-center left-0 top-0 w-[87.266px]" data-name="List Item">
            <BackgroundImage5 additionalClassNames="h-[20.797px] w-[52.25px]">
              <div className="absolute left-0 size-[12px] top-[4.4px]" data-name="IconBase">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <g id="IconBase">
                    <path d={svgPaths.p3e407f80} fill="var(--fill-0, #D4008C)" id="Vector" />
                  </g>
                </svg>
              </div>
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.8px] left-[16px] not-italic text-[#d4008c] text-[13px] top-[0.5px] whitespace-nowrap">Home</p>
            </BackgroundImage5>
            <div className="relative shrink-0 size-[10px]" data-name="IconBase">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                <g id="IconBase">
                  <path d={svgPaths.p3d214180} fill="var(--fill-0, #A3A3A3)" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[20.797px] items-center left-[95.27px] top-[0.8px] w-[68.773px]" data-name="List Item">
            <BackgroundImage6 additionalClassNames="h-[20.797px]">
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.8px] left-0 not-italic text-[#1a1a1a] text-[13px] top-[0.5px] whitespace-nowrap">Style guide</p>
            </BackgroundImage6>
          </div>
        </div>
        <div className="absolute bg-[#fafafa] h-[10761.133px] left-0 top-[144.99px] w-[1159px]" data-name="StyleGuidePage">
          <div className="absolute content-stretch flex flex-col h-[401.867px] items-start left-0 pb-px pt-[96px] px-[179.5px] top-0 w-[1159px]" data-name="Section" style={{ backgroundImage: "linear-gradient(rgb(15, 15, 15) 0%, rgb(18, 18, 26) 100%), linear-gradient(90deg, rgb(240, 240, 240) 0%, rgb(240, 240, 240) 100%)" }}>
            <div aria-hidden="true" className="absolute border-[rgba(255,16,240,0.2)] border-b border-solid inset-0 pointer-events-none" />
            <div className="h-[208.867px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute h-[19.195px] left-0 top-0 w-[800px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[400.45px] not-italic text-[#8c7a00] text-[12px] text-center top-0 tracking-[2px] uppercase whitespace-nowrap">⚡ Design System</p>
              </div>
              <div className="absolute h-[93.672px] left-0 top-[35.2px] w-[800px]" data-name="Heading 1">
                <p className="-translate-x-1/2 absolute bg-clip-text font-['Righteous:Regular',sans-serif] leading-[93.68px] left-[400.29px] not-italic text-[58.55px] text-[transparent] text-center top-[0.5px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgb(26, 26, 26) 0%, rgb(26, 26, 26) 100%), linear-gradient(162.976deg, rgb(255, 16, 240) 0%, rgb(244, 255, 60) 100%)" }}>
                  Style Guide
                </p>
              </div>
              <div className="absolute h-[64px] left-[100px] top-[144.87px] w-[600px]" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-[300.1px] not-italic text-[#cfc7bb] text-[20px] text-center top-[-0.5px] w-[562px]">Complete documentation of the Nova News design system: 80s neon CLI aesthetic with retro terminal vibes</p>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[80px] h-[10359.266px] items-start left-[320px] pt-[60px] px-[32px] top-[401.87px] w-[839px]" data-name="Container">
            <div className="content-stretch flex flex-col gap-[32px] h-[479.398px] items-start relative shrink-0 w-full" data-name="Section">
              <HeadingBackgroundImageAndText text="1. Brand Identity" />
              <div className="bg-white h-[373.188px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
                <div className="content-stretch flex flex-col gap-[40px] items-start pt-[68px] px-[40px] relative size-full">
                  <div className="h-[128.406px] relative shrink-0 w-full" data-name="Heading 1">
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[112.416px] left-[348.44px] not-italic text-[#1a1a1a] text-[70.26px] text-center top-[15.5px] tracking-[1px] uppercase whitespace-nowrap">Nova News</p>
                  </div>
                  <div className="h-[76.781px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[347.88px] not-italic text-[#cfc7bb] text-[16px] text-center top-[-1px] w-[658px]">Nova News combines 80s neon aesthetics with modern CLI terminal design. The brand identity is built on high-contrast neon colors against deep atomic black backgrounds, creating a retro-futuristic visual language that is both nostalgic and contemporary.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[2107.961px] relative shrink-0 w-full" data-name="Section">
              <div className="absolute border-[rgba(255,16,240,0.2)] border-b-2 border-solid h-[74.211px] left-0 top-0 w-[775px]" data-name="Heading 2">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[56.208px] left-0 not-italic text-[#12121a] text-[35.13px] top-[-0.5px] whitespace-nowrap">2. Color Palette</p>
              </div>
              <BackgroundImageAndText text="Click any color swatch to copy the hex code to your clipboard." additionalClassNames="top-[106.21px] w-[775px]" />
              <div className="absolute h-[1952.156px] left-0 top-[155.8px] w-[775px]" data-name="Container">
                <ButtonBackgroundImage additionalClassNames="left-0 top-0">
                  <div className="bg-[#0f0f0f] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Atomic Black" />
                    <CodeBackgroundImageAndText text="#0F0F0F" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--atomic-black" />
                    <ParagraphBackgroundImageAndText text="Primary background color for dark mode" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-[399.5px] top-0">
                  <div className="bg-[#12121a] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Dark Charcoal" />
                    <CodeBackgroundImageAndText text="#12121A" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--dark-charcoal" />
                    <ParagraphBackgroundImageAndText text="Secondary background for panels" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-0 top-[329.36px]">
                  <div className="bg-[#171722] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Dark Panel" />
                    <CodeBackgroundImageAndText text="#171722" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--dark-panel" />
                    <ParagraphBackgroundImageAndText text="Elevated surface background" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-[399.5px] top-[329.36px]">
                  <div className="bg-[#ff10f0] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Neon Pink" />
                    <CodeBackgroundImageAndText text="#FF10F0" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--neon-pink" />
                    <ParagraphBackgroundImageAndText text="Primary brand color - main CTAs and accents" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-0 top-[658.72px]">
                  <div className="bg-[#f4ff3c] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Neon Yellow" />
                    <CodeBackgroundImageAndText text="#F4FF3C" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--neon-yellow" />
                    <ParagraphBackgroundImageAndText text="Secondary accent - highlights and warnings" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-[399.5px] top-[658.72px]">
                  <div className="bg-[#d4008c] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Neon Magenta" />
                    <CodeBackgroundImageAndText text="#D4008C" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--neon-magenta" />
                    <ParagraphBackgroundImageAndText text="Gradient accent color" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-0 top-[988.08px]">
                  <div className="bg-[#8a63ff] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="UV Violet" />
                    <CodeBackgroundImageAndText text="#8A63FF" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--uv-violet" />
                    <ParagraphBackgroundImageAndText text="Tertiary accent - special highlights" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-[399.5px] top-[988.08px]">
                  <div className="bg-[#f6f2eb] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Text Light" />
                    <CodeBackgroundImageAndText text="#F6F2EB" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--text-light" />
                    <ParagraphBackgroundImageAndText text="Primary text color in dark mode" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-0 top-[1317.44px]">
                  <div className="bg-[#cfc7bb] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Text Muted" />
                    <CodeBackgroundImageAndText text="#CFC7BB" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--text-muted" />
                    <ParagraphBackgroundImageAndText text="Secondary text - less emphasis" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-[399.5px] top-[1317.44px]">
                  <div className="bg-[#9c9488] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Text Fine" />
                    <CodeBackgroundImageAndText text="#9C9488" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--text-fine" />
                    <ParagraphBackgroundImageAndText text="Tertiary text - minimal emphasis" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-0 top-[1646.8px]">
                  <div className="bg-[#f0f0f0] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Light Gray" />
                    <CodeBackgroundImageAndText text="#F0F0F0" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--light-gray" />
                    <ParagraphBackgroundImageAndText text="Light mode background" />
                  </div>
                </ButtonBackgroundImage>
                <ButtonBackgroundImage additionalClassNames="left-[399.5px] top-[1646.8px]">
                  <div className="bg-[#fafafa] h-[120px] shrink-0 w-full" data-name="Container" />
                  <div className="h-[183.359px] relative shrink-0 w-full" data-name="Container">
                    <HeadingBackgroundImageAndText1 text="Lighter Gray" />
                    <CodeBackgroundImageAndText text="#FAFAFA" />
                    <CodeBackgroundImageAndText1 text="--wp--preset--color--lighter-gray" />
                    <ParagraphBackgroundImageAndText text="Light mode elevated background" />
                  </div>
                </ButtonBackgroundImage>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] h-[1212.93px] items-start relative shrink-0 w-full" data-name="Section">
              <HeadingBackgroundImageAndText text="3. Typography" />
              <div className="content-stretch flex flex-col gap-[40px] h-[1106.719px] items-start relative shrink-0 w-full" data-name="Container">
                <ContainerBackgroundImage additionalClassNames="h-[122.789px] shrink-0">
                  <HeadingBackgroundImageAndText2 text="Heading 1" />
                  <BackgroundImageAndText1 text="Vampiro One / Space Grotesk / 48–120px" />
                </ContainerBackgroundImage>
                <ContainerBackgroundImage additionalClassNames="h-[122.789px] shrink-0">
                  <HeadingBackgroundImageAndText2 text="Heading 2" />
                  <BackgroundImageAndText1 text="Space Grotesk / 32–64px" />
                </ContainerBackgroundImage>
                <ContainerBackgroundImage additionalClassNames="h-[122.789px] shrink-0">
                  <HeadingBackgroundImageAndText2 text="Heading 3" />
                  <BackgroundImageAndText1 text="Space Grotesk / 24–48px" />
                </ContainerBackgroundImage>
                <ContainerBackgroundImage additionalClassNames="h-[122.789px] shrink-0">
                  <HeadingBackgroundImageAndText2 text="Heading 4" />
                  <BackgroundImageAndText1 text="Space Grotesk / 20–32px" />
                </ContainerBackgroundImage>
                <ContainerBackgroundImage additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
                  <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#12121a] text-[16px] top-[-1px] w-[686px]">Body text uses Space Grotesk at 16–20px with 1.6 line height for optimal readability. This is the standard paragraph text used throughout the site for main content.</p>
                  </div>
                  <BackgroundImageAndText1 text="Space Grotesk / 16–20px / Line height 1.6" />
                </ContainerBackgroundImage>
                <ContainerBackgroundImage1 additionalClassNames="h-[110.789px] shrink-0">
                  <div className="absolute bg-[#f5f5f5] border border-[#e5e5e5] border-solid h-[24.75px] left-[33px] rounded-[3px] top-[34.13px] w-[204.25px]" data-name="Code">
                    <p className="absolute font-['Menlo:Regular',sans-serif] leading-[23.04px] left-[5.76px] not-italic text-[#1a1a1a] text-[14.4px] top-[-1.13px] whitespace-nowrap">Code and terminal text</p>
                  </div>
                  <div className="absolute h-[19.195px] left-[33px] top-[58.59px] w-[709px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#6b6b6b] text-[12px] top-0 whitespace-nowrap">Space Mono / Monospace / 14–16px</p>
                  </div>
                </ContainerBackgroundImage1>
                <ContainerBackgroundImage additionalClassNames="h-[116.391px] shrink-0">
                  <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#8c7a00] text-[12px] top-0 tracking-[2px] uppercase whitespace-nowrap">⚡ Eyebrow text</p>
                  </div>
                  <BackgroundImageAndText1 text="Space Grotesk / 12–14px / Uppercase / Letter spacing 1px" />
                </ContainerBackgroundImage>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] h-[808.578px] items-start relative shrink-0 w-full" data-name="Section">
              <HeadingBackgroundImageAndText text="4. Buttons" />
              <div className="content-stretch flex flex-col gap-[40px] h-[702.367px] items-start relative shrink-0 w-full" data-name="Container">
                <ContainerBackgroundImage1 additionalClassNames="h-[206.789px] shrink-0">
                  <HeadingBackgroundImageAndText3 text="Primary Button" />
                  <div className="absolute h-[57.594px] left-[33px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-[81px] w-[174.734px]" data-name="Button" style={{ backgroundImage: "linear-gradient(161.757deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[87.5px] not-italic text-[16px] text-center text-white top-[15.5px] whitespace-nowrap">Primary Action</p>
                  </div>
                  <ParagraphBackgroundImageAndText1 text="Pink to purple gradient with glow effect" additionalClassNames="top-[154.59px]" />
                </ContainerBackgroundImage1>
                <ContainerBackgroundImage1 additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
                  <HeadingBackgroundImageAndText3 text="Secondary Button" />
                  <div className="absolute border border-[#e5e5e5] border-solid h-[59.594px] left-[33px] rounded-[4px] top-[81px] w-[198.172px]" data-name="Button">
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[98.5px] not-italic text-[#1a1a1a] text-[16px] text-center top-[15.5px] whitespace-nowrap">Secondary Action</p>
                  </div>
                  <ParagraphBackgroundImageAndText1 text="Yellow border with hover glow" additionalClassNames="top-[156.59px]" />
                </ContainerBackgroundImage1>
                <ContainerBackgroundImage1 additionalClassNames="h-[206.789px] shrink-0">
                  <HeadingBackgroundImageAndText3 text="Button with Icon" />
                  <div className="absolute h-[57.594px] left-[33px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-[81px] w-[163.742px]" data-name="Button" style={{ backgroundImage: "linear-gradient(160.621deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
                    <p className="-translate-x-1/2 absolute font-['Righteous:Regular',sans-serif] leading-[25.6px] left-[72px] not-italic text-[16px] text-center text-white top-[15.5px] whitespace-nowrap">{`Read More `}</p>
                    <div className="absolute left-[111.74px] size-[20px] top-[18.8px]" data-name="IconBase">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g id="IconBase">
                          <path d={svgPaths.p6a6bf00} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <ParagraphBackgroundImageAndText1 text="Buttons can include Phosphor icons" additionalClassNames="top-[154.59px]" />
                </ContainerBackgroundImage1>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] h-[438.172px] items-start relative shrink-0 w-full" data-name="Section">
              <HeadingBackgroundImageAndText text="5. Forms" />
              <div className="content-stretch flex flex-col gap-[40px] h-[331.961px] items-start relative shrink-0 w-full" data-name="Container">
                <div className="flex-[1_0_0] min-h-px min-w-px relative w-[500px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
                    <ContainerBackgroundImage2>
                      <LabelBackgroundImageAndText text="Input Label" />
                      <TextInputBackgroundImageAndText text="Enter text here..." />
                    </ContainerBackgroundImage2>
                    <ContainerBackgroundImage2>
                      <LabelBackgroundImageAndText text="Textarea Label" />
                      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[500px]" data-name="Text Area">
                        <div className="overflow-clip rounded-[inherit] size-full">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start p-[16px] relative size-full">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] not-italic relative shrink-0 text-[#a3a3a3] text-[16px] whitespace-nowrap">Enter longer text here...</p>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                    </ContainerBackgroundImage2>
                  </div>
                </div>
                <div className="h-[19.195px] relative shrink-0 w-[775px]" data-name="Paragraph">
                  <BackgroundImageAndText2 text="Forms feature dark backgrounds with pink borders that glow on focus" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] h-[447.797px] items-start relative shrink-0 w-full" data-name="Section">
              <HeadingBackgroundImageAndText text="6. Cards" />
              <div className="h-[341.586px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[169.992px] left-0 rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-0 w-[375.5px]" data-name="Container">
                  <TextBackgroundImageAndText text="Default" />
                  <HeadingBackgroundImageAndText4 text="Default Card" />
                  <div className="absolute h-[44.797px] left-[32px] top-[91.2px] w-[309.5px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[#4a4a4a] text-[14px] top-[0.5px] w-[279px]">Standard card with subtle pink border and glow on hover</p>
                  </div>
                </div>
                <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[169.992px] left-[399.5px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-0 w-[375.5px]" data-name="Container">
                  <TextBackgroundImageAndText text="Featured" />
                  <HeadingBackgroundImageAndText4 text="Yellow Outline Card" />
                  <BackgroundImageAndText3 text="Card with neon yellow border and glow effect" />
                </div>
                <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[147.594px] left-0 rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-[193.99px] w-[375.5px]" data-name="Container">
                  <TextBackgroundImageAndText text="Special" />
                  <HeadingBackgroundImageAndText4 text="Violet Outline Card" />
                  <BackgroundImageAndText3 text="Card with UV violet border and glow effect" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] h-[271.805px] items-start relative shrink-0 w-full" data-name="Section">
              <BackgroundImage8>{`7. Tags & Badges`}</BackgroundImage8>
              <div className="content-stretch flex flex-col gap-[40px] h-[165.594px] items-start relative shrink-0 w-full" data-name="Container">
                <ContainerBackgroundImage1 additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
                  <TextBackgroundImageAndText1 text="Default Tag" additionalClassNames="left-[33px] w-[109.813px]" />
                  <TextBackgroundImageAndText1 text="Yellow Tag" additionalClassNames="left-[154.81px] w-[104.82px]" />
                  <TextBackgroundImageAndText1 text="Green Tag" additionalClassNames="left-[271.63px] w-[102.195px]" />
                </ContainerBackgroundImage1>
                <div className="h-[19.195px] relative shrink-0 w-[775px]" data-name="Paragraph">
                  <BackgroundImageAndText2 text="Tags feature neon borders with glow effects on hover" />
                </div>
              </div>
            </div>
            <div className="h-[2620.297px] relative shrink-0 w-full" data-name="Section">
              <div className="absolute border-[rgba(255,16,240,0.2)] border-b-2 border-solid h-[74.211px] left-0 top-0 w-[775px]" data-name="Heading 2">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#12121a] text-[0px] top-[-0.5px] whitespace-nowrap">
                  <span className="leading-[56.208px] text-[35.13px]">{`8. Icon Library `}</span>
                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] text-[#ff10f0] text-[20px]">(49 icons)</span>
                </p>
              </div>
              <div className="absolute content-stretch flex flex-col h-[59.594px] items-start left-0 top-[106.21px] w-[500px]" data-name="Container">
                <TextInputBackgroundImageAndText text="Search icons by name or category..." />
              </div>
              <div className="absolute h-[51.188px] left-0 top-[197.8px] w-[775px]" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[745px]">All Phosphor Icons currently used across the Nova News site. Icons are organized by category and can be used at any size with multiple weight options.</p>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[174.992px] items-start left-0 top-[272.99px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Communication (3)" />
                <div className="h-[107.594px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3806de00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="Envelope" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p25c2c980} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[79.477px]">
                      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[40.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">ShareNetwork</p>
                    </BackgroundImage5>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3fdcaaf0} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="LinkIcon" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[174.992px] items-start left-0 top-[495.98px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Content (5)" />
                <div className="h-[107.594px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3894d00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="BookOpen" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.pff74c80} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="FileText" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p36e55c00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText3 text="Newspaper" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3d1ca00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText4 text="Code" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3c05e400} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="ChatCircle" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[298.586px] items-start left-0 top-[718.98px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Design System (7)" />
                <div className="h-[231.188px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p8232000} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText6 text="Stack" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3788c600} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="PaintBrush" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p22e859f0} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText7 text="Palette" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2ff78680} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText8 text="TextAa" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p203fe200} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText4 text="Cube" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-[123.59px] w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p223c9e00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText9 text="SquaresFour" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-[123.59px] w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2e356180} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText3 text="Lightning" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[298.586px] items-start left-0 top-[1065.56px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Media (9)" />
                <div className="h-[231.188px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2f819e00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText4 text="Play" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p19012770} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="PlayCircle" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p35936300} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="Microphone" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p23604f00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="Headphones" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.pdc0b280} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText8 text="Record" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-[123.59px] w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p297a1680} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="MusicNotes" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-[123.59px] w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2968f600} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="Playlist" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-[123.59px] w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p13db5000} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText9 text="SpotifyLogo" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-[123.59px] w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <BackgroundImage2>
                      <g clipPath="url(#clip0_4117_2122)" id="IconBase">
                        <path d={svgPaths.p3a7056c0} fill="var(--fill-0, #12121A)" id="Vector" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4117_2122">
                          <rect fill="white" height="32" width="32" />
                        </clipPath>
                      </defs>
                    </BackgroundImage2>
                    <TextBackgroundImageAndText10 text="SoundcloudLogo" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[174.992px] items-start left-0 top-[1412.15px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Navigation (5)" />
                <div className="h-[107.594px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2f75c200} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText6 text="House" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p331c4d00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="ArrowRight" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3b369d00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText3 text="ArrowLeft" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2b797800} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText10 text="ArrowSquareOut" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3750f500} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText3 text="CaretDown" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[174.992px] items-start left-0 top-[1635.14px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Organization (5)" />
                <div className="h-[107.594px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p225f680} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText11 text="Tag" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p232dff00} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText6 text="Clock" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.pc817e80} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText8 text="MapPin" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.pe2ee600} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText6 text="Heart" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p18898300} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="Confetti" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[174.992px] items-start left-0 top-[1858.13px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Status (5)" />
                <div className="h-[107.594px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p21d7580} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText7 text="Warning" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p390f7200} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText12 text="ArrowsClockwise" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p16a61300} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText2 text="WifiHigh" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2fb2980} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[59.609px]">
                      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[30px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">WifiSlash</p>
                    </BackgroundImage5>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2abb6480} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText10 text="DownloadSimple" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[174.992px] items-start left-0 top-[2081.13px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="Theme (4)" />
                <div className="h-[107.594px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p36424600} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText4 text="Moon" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[158.2px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p55fda40} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText11 text="Sun" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[316.4px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p1f7a5180} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText5 text="CircleHalf" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-[474.59px] px-px py-[25px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p2cada900} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText8 text="Wrench" />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[20px] h-[316.18px] items-start left-0 top-[2304.12px] w-[775px]" data-name="Container">
                <HeadingBackgroundImageAndText5 text="UI Controls (6)" />
                <div className="h-[248.781px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[125.188px] items-center justify-center left-0 px-px py-[33.797px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p109cea80} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[6.625px]">
                      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[3.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">X</p>
                    </BackgroundImage5>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[125.188px] items-center justify-center left-[158.2px] px-px py-[33.797px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p18841800} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText6 text="Check" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[125.188px] items-center justify-center left-[316.4px] px-px py-[33.797px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.pf660200} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText12 text="MagnifyingGlass" />
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[125.188px] items-center justify-center left-[474.59px] px-px py-[33.797px] rounded-[8px] top-0 w-[142.203px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p3a86c200} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <BackgroundImage5 additionalClassNames="h-[17.594px] w-[46.359px]">
                      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[23.5px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] whitespace-nowrap">Shuffle</p>
                    </BackgroundImage5>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[125.188px] items-center justify-center left-[632.8px] px-px py-[25px] rounded-[8px] top-0 w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p24f7c000} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <BackgroundImage5 additionalClassNames="h-[35.188px] w-[108.195px]">
                      <p className="-translate-x-1/2 absolute font-['Space_Mono:Regular',sans-serif] leading-[17.6px] left-[54.12px] not-italic text-[#9c9488] text-[11px] text-center top-[1.5px] w-[106px]">SlidersHorizontal</p>
                    </BackgroundImage5>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[107.594px] items-center justify-center left-0 px-px py-[25px] rounded-[8px] top-[141.19px] w-[142.195px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <IconBaseBackgroundImage>
                      <path d={svgPaths.p261b54c0} fill="var(--fill-0, #12121A)" id="Vector" />
                    </IconBaseBackgroundImage>
                    <TextBackgroundImageAndText4 text="Copy" />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] h-[1132.328px] items-start relative shrink-0 w-full" data-name="Section">
              <HeadingBackgroundImageAndText text="9. Content Patterns" />
              <div className="content-stretch flex flex-col gap-[40px] h-[1026.117px] items-start relative shrink-0 w-full" data-name="Container">
                <ContainerBackgroundImage1 additionalClassNames="h-[231.977px] shrink-0">
                  <HeadingBackgroundImageAndText3 text="Code Blocks" />
                  <div className="absolute bg-[#f5f5f5] content-stretch flex flex-col h-[78.781px] items-start left-[33px] pb-px pl-px pr-[456.578px] pt-[5.5px] top-[85px] w-[709px]" data-name="Code Block">
                    <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
                    <div className="h-[68.188px] relative rounded-[3px] shrink-0 w-full" data-name="Code">
                      <div className="absolute font-['Menlo:Regular',sans-serif] leading-[23.04px] left-0 not-italic text-[#1a1a1a] text-[14.4px] top-[-4px] w-[252px]">
                        <p className="mb-0">{`const neonPink = "#FF10F0";`}</p>
                        <p className="mb-0">{`const neonYellow = "#F4FF3C";`}</p>
                        <p>{`console.log("80s vibes");`}</p>
                      </div>
                    </div>
                  </div>
                  <ParagraphBackgroundImageAndText1 text="Terminal aesthetic with neon green text" additionalClassNames="top-[179.78px]" />
                </ContainerBackgroundImage1>
                <ContainerBackgroundImage1 additionalClassNames="h-[204.383px] shrink-0">
                  <HeadingBackgroundImageAndText3 text="Blockquote" />
                  <div className="absolute bg-[#f5f5f5] content-stretch flex flex-col h-[51.188px] items-start left-[33px] pl-[4px] top-[85px] w-[709px]" data-name="Quote">
                    <div aria-hidden="true" className="absolute border-[#d4008c] border-l-4 border-solid inset-0 pointer-events-none" />
                    <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[657px]">The dancefloor gave me everything. It taught me how to move, how to feel, and how to create without fear.</p>
                    </div>
                  </div>
                  <ParagraphBackgroundImageAndText1 text="Pink left border with subtle background" additionalClassNames="top-[152.19px]" />
                </ContainerBackgroundImage1>
                <ContainerBackgroundImage1 additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
                  <HeadingBackgroundImageAndText3 text="Lists" />
                  <div className="absolute content-stretch flex flex-col h-[76.781px] items-start left-[33px] top-[85px] w-[709px]" data-name="List">
                    <ListItemBackgroundImageAndText text="Unordered list with pink bullets" />
                    <ListItemBackgroundImageAndText text="Perfect for feature lists" />
                    <ListItemBackgroundImageAndText text="Clean and minimal styling" />
                  </div>
                  <div className="absolute content-stretch flex flex-col h-[76.781px] items-start left-[33px] top-[177.78px] w-[709px]" data-name="Numbered List">
                    <ListItemBackgroundImageAndText text="Ordered list with yellow numbers" />
                    <ListItemBackgroundImageAndText text="Great for step-by-step guides" />
                    <ListItemBackgroundImageAndText text="Numbered styling stands out" />
                  </div>
                </ContainerBackgroundImage1>
                <div className="bg-white h-[166.195px] relative rounded-[8px] shrink-0 w-[775px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pb-px pt-[33px] px-[33px] relative size-full">
                    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[#12121a] text-[20px] top-[-0.5px] whitespace-nowrap">Horizontal Rule</p>
                    </div>
                    <div className="h-px relative shrink-0 w-full" data-name="Horizontal Rule">
                      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none" />
                    </div>
                    <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[#9c9488] text-[12px] top-0 whitespace-nowrap">Gradient line with pink center fade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fafafa] h-[623.961px] left-0 top-[10906.13px] w-[1159px]" data-name="Footer">
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[97px] px-[24px] relative rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[64px] h-[430.961px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="h-[291.961px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute content-stretch flex flex-col gap-[52px] h-[291.961px] items-start left-0 top-0 w-[338.328px]" data-name="Container">
                  <BackgroundImage5 additionalClassNames="h-[38.398px] w-[338.328px]">
                    <p className="absolute font-['Righteous:Regular',sans-serif] leading-[38.4px] left-0 not-italic text-[#8c7a00] text-[24px] top-0 whitespace-nowrap">This one time on acid...</p>
                  </BackgroundImage5>
                  <BackgroundImage5 additionalClassNames="h-[81.586px] w-[338.328px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27.2px] left-0 not-italic text-[#6b6b6b] text-[16px] top-[-0.5px] w-[334px]">A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.</p>
                  </BackgroundImage5>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[362.33px] top-0 w-[169.172px]" data-name="Navigation">
                  <BackgroundImageAndText4 text="The Book" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[213.563px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="Home" additionalClassNames="top-0 w-[44.617px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="The Book" additionalClassNames="top-0 w-[71.75px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="Read the Draft" additionalClassNames="top-0 w-[110.25px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="Ebook Reader" additionalClassNames="top-0 w-[105.484px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="Draft Viewer" additionalClassNames="top-0 w-[94.484px]" />
                    </BackgroundImage5>
                    <BackgroundImage6 additionalClassNames="w-[169.172px]">
                      <BackgroundImageAndText text="Waitlist" additionalClassNames="top-0 w-[54.961px]" />
                    </BackgroundImage6>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[555.5px] top-0 w-[169.164px]" data-name="Navigation">
                  <BackgroundImage4>{`Author & Press`}</BackgroundImage4>
                  <div className="content-stretch flex flex-col gap-[12px] h-[201.563px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <BackgroundImageAndText text="About Ash" additionalClassNames="top-0 w-[78.547px]" />
                    </BackgroundImage5>
                    <BackgroundImage6 additionalClassNames="w-[169.164px]">
                      <div className="absolute h-[51.188px] left-0 top-0 w-[169.164px]" data-name="Button">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] w-[85px]">{`Speaking & Workshops`}</p>
                      </div>
                    </BackgroundImage6>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <BackgroundImageAndText text="Events" additionalClassNames="top-0 w-[50.867px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <div className="absolute h-[25.594px] left-0 top-0 w-[107.414px]" data-name="Button">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#4a4a4a] text-[16px] top-[-1px] whitespace-nowrap">{`Media & Press`}</p>
                      </div>
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <BackgroundImageAndText text="Contact" additionalClassNames="top-0 w-[60.141px]" />
                    </BackgroundImage5>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[748.66px] top-0 w-[169.164px]" data-name="Navigation">
                  <BackgroundImageAndText4 text="Content" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[138.375px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <BackgroundImageAndText text="Journal" additionalClassNames="top-0 w-[55.664px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <BackgroundImageAndText text="Blog" additionalClassNames="top-0 w-[33.5px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.164px]">
                      <BackgroundImageAndText text="Videos" additionalClassNames="top-0 w-[51.773px]" />
                    </BackgroundImage5>
                    <BackgroundImage6 additionalClassNames="w-[169.164px]">
                      <BackgroundImageAndText text="Podcasts" additionalClassNames="top-0 w-[69.891px]" />
                    </BackgroundImage6>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[16px] h-[291.961px] items-start left-[941.83px] top-0 w-[169.172px]" data-name="Navigation">
                  <BackgroundImageAndText4 text="Discover" />
                  <div className="content-stretch flex flex-col gap-[12px] h-[100.781px] items-start relative shrink-0 w-full" data-name="List">
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="Search" additionalClassNames="top-0 w-[52.617px]" />
                    </BackgroundImage5>
                    <BackgroundImage5 additionalClassNames="h-[25.594px] w-[169.172px]">
                      <BackgroundImageAndText text="Thank You" additionalClassNames="top-0 w-[79.57px]" />
                    </BackgroundImage5>
                    <BackgroundImage6 additionalClassNames="w-[169.172px]">
                      <BackgroundImageAndText text="Dev Tools" additionalClassNames="top-0 w-[74.211px]" />
                    </BackgroundImage6>
                  </div>
                </div>
              </div>
              <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-[#f8f8f8] border-solid border-t inset-0 pointer-events-none" />
                <div className="absolute content-stretch flex h-[19.195px] items-start left-0 top-[44.4px] w-[332.5px]" data-name="Container">
                  <div className="h-[19.195px] relative shrink-0 w-[221.852px]" data-name="Text">
                    <BackgroundImageAndText2 text="© 2026 Ash Shaw. All Rights Reserved." />
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[42px] items-center justify-center left-[356.5px] top-[33px] w-[398px]" data-name="Container">
                  <div className="bg-[#fafafa] h-[42px] relative rounded-[9999px] shrink-0 w-[110px]" data-name="ThemeSwitcher">
                    <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center px-[5px] py-px relative size-full">
                      <BackgroundImage9 additionalClassNames="bg-white">
                        <BackgroundImage1>
                          <g clipPath="url(#clip0_4117_2161)" id="IconBase">
                            <path d={svgPaths.p20818200} fill="var(--fill-0, white)" id="Vector" />
                          </g>
                          <defs>
                            <clipPath id="clip0_4117_2161">
                              <rect fill="white" height="16" width="16" />
                            </clipPath>
                          </defs>
                        </BackgroundImage1>
                      </BackgroundImage9>
                      <BackgroundImage9>
                        <IconBaseBackgroundImage1>
                          <path d={svgPaths.p13e24400} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                        </IconBaseBackgroundImage1>
                      </BackgroundImage9>
                      <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[16px]" data-name="Button">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
                            <IconBaseBackgroundImage1>
                              <path d={svgPaths.pdd06300} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                            </IconBaseBackgroundImage1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BackgroundImage5 additionalClassNames="h-[36px] w-[236px]">
                    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4117_2110)" id="Icon">
                          <path d={svgPaths.p3eb94a70} fill="var(--fill-0, #D4008C)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4117_2110">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[40px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4117_2218)" id="Icon">
                          <path d={svgPaths.p38127b00} fill="var(--fill-0, #D4008C)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4117_2218">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[80px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4117_2134)" id="Icon">
                          <path d={svgPaths.p1f524b00} fill="var(--fill-0, #D4008C)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4117_2134">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[120px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <BackgroundImage>
                        <g clipPath="url(#clip0_4117_2131)" id="Icon">
                          <path d={svgPaths.p7d0ab00} fill="var(--fill-0, #D4008C)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_4117_2131">
                            <rect fill="white" height="18" width="18" />
                          </clipPath>
                        </defs>
                      </BackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[160px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <IconBackgroundImage>
                        <path d={svgPaths.p532d600} fill="var(--fill-0, #D4008C)" id="Vector" />
                      </IconBackgroundImage>
                    </div>
                    <div className="absolute content-stretch flex items-center justify-center left-[200px] overflow-clip px-[9px] size-[36px] top-0" data-name="Link">
                      <IconBackgroundImage>
                        <path d={svgPaths.p3869cc00} fill="var(--fill-0, #D4008C)" id="Vector" />
                        <path d={svgPaths.p329f880} fill="var(--fill-0, #D4008C)" id="Vector_2" />
                      </IconBackgroundImage>
                    </div>
                  </BackgroundImage5>
                  <div className="relative shrink-0 size-[20px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                      <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="IconBase">
                        <div className="absolute inset-[12.49%_6.24%_12.5%_6.25%]" data-name="Vector">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.502 15.0011">
                            <path d={svgPaths.p8c3f580} fill="var(--fill-0, #4A4A4A)" id="Vector" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[16px] h-[25.594px] items-start justify-end left-[778.5px] top-[41.2px] w-[332.5px]" data-name="Container">
                  <BackgroundImage5 additionalClassNames="h-[25.594px] w-[104.961px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[52.5px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] whitespace-nowrap">Privacy Policy</p>
                  </BackgroundImage5>
                  <BackgroundImage5 additionalClassNames="h-[25.594px] w-[127.57px]">
                    <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[64px] not-italic text-[#4a4a4a] text-[16px] text-center top-[-1px] whitespace-nowrap">Terms of Service</p>
                  </BackgroundImage5>
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
        <div className="absolute h-[56px] left-[430.91px] top-[24.8px] w-[297.188px]" data-name="Container">
          <div className="absolute flex h-[68.601px] items-center justify-center left-[-1.58px] top-[-12.67px] w-[299.625px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "456" } as React.CSSProperties}>
            <div className="-rotate-4 flex-none">
              <div className="h-[48px] relative w-[297px]" data-name="Link">
                <TextBackgroundImageAndText13 text="T" additionalClassNames="left-[16.34px]" />
                <TextBackgroundImageAndText14 text="h" additionalClassNames="left-[29.12px]" />
                <TextBackgroundImageAndText15 text="i" additionalClassNames="left-[43.78px]" />
                <div className="absolute h-[48px] left-[50.44px] top-0 w-[11.7px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.3px] not-italic text-[#1a1a1a] text-[20px] top-[0.94px] tracking-[1px] uppercase whitespace-nowrap">s</p>
                </div>
                <TextBackgroundImageAndText16 text="&nbsp;" additionalClassNames="left-[63.05px]" />
                <TextBackgroundImageAndText17 text="o" additionalClassNames="left-[70.13px]" />
                <TextBackgroundImageAndText14 text="n" additionalClassNames="left-[86.71px]" />
                <TextBackgroundImageAndText13 text="e" additionalClassNames="left-[101.3px]" />
                <TextBackgroundImageAndText16 text="&nbsp;" additionalClassNames="left-[113.58px]" />
                <TextBackgroundImageAndText13 text="t" additionalClassNames="left-[120.46px]" />
                <TextBackgroundImageAndText15 text="i" additionalClassNames="left-[133.1px]" />
                <div className="absolute h-[48px] left-[140.05px] top-0 w-[15.3px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.21px] not-italic text-[#1a1a1a] text-[20px] top-[0.77px] tracking-[1px] uppercase whitespace-nowrap">m</p>
                </div>
                <TextBackgroundImageAndText13 text="e" additionalClassNames="left-[156.83px]" />
                <TextBackgroundImageAndText16 text="&nbsp;" additionalClassNames="left-[169.11px]" />
                <TextBackgroundImageAndText17 text="o" additionalClassNames="left-[176.19px]" />
                <TextBackgroundImageAndText14 text="n" additionalClassNames="left-[192.78px]" />
                <TextBackgroundImageAndText16 text="&nbsp;" additionalClassNames="left-[207.08px]" />
                <div className="absolute h-[48px] left-[214.47px] top-0 w-[12.6px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.17px] not-italic text-[#1a1a1a] text-[20px] top-[0.9px] tracking-[1px] uppercase whitespace-nowrap">a</p>
                </div>
                <div className="absolute h-[48px] left-[228.61px] top-0 w-[12.6px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.5px] not-italic text-[#1a1a1a] text-[20px] top-[0.91px] tracking-[1px] uppercase whitespace-nowrap">c</p>
                </div>
                <TextBackgroundImageAndText15 text="i" additionalClassNames="left-[242.32px]" />
                <div className="absolute h-[48px] left-[248.96px] top-0 w-[12.6px]" data-name="Text">
                  <p className="absolute font-['Righteous:Regular',sans-serif] leading-[32px] left-[0.37px] not-italic text-[#1a1a1a] text-[20px] top-[0.9px] tracking-[1px] uppercase whitespace-nowrap">d</p>
                </div>
                <TextBackgroundImageAndText18 text="." additionalClassNames="left-[262.73px]" />
                <TextBackgroundImageAndText18 text="." additionalClassNames="left-[269px]" />
                <TextBackgroundImageAndText18 text="." additionalClassNames="left-[275.26px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[57.594px] left-[728.09px] top-[24px] w-[406.906px]" data-name="Container">
          <div className="absolute content-stretch flex h-[57.594px] items-center justify-center left-[219.92px] px-[32px] py-[16px] rounded-[4px] shadow-[0px_4px_20px_0px_rgba(255,58,174,0.3)] top-0 w-[186.984px]" data-name="Button" style={{ backgroundImage: "linear-gradient(162.88deg, rgb(212, 0, 140) 0%, rgb(85, 0, 204) 100%)" }}>
            <p className="font-['Righteous:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Unlock the Draft</p>
          </div>
          <div className="absolute bg-white left-[163.92px] rounded-[22px] size-[44px] top-[6.8px]" data-name="ThemeToggleES5">
            <div className="content-stretch flex items-center justify-center overflow-clip pl-[11.313px] pr-[11.32px] py-[2px] relative rounded-[inherit] size-full">
              <div className="h-[20px] relative shadow-[0px_0px_4px_0px_rgba(15,15,15,0.3)] shrink-0 w-[21.367px]" data-name="Text">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0f0f0f] text-[20px] text-center whitespace-nowrap">☀</p>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-2 border-[#ff10f0] border-solid inset-0 pointer-events-none rounded-[22px] shadow-[0px_1.724px_6.897px_0.414px_rgba(255,16,240,0.31),0px_0px_10.345px_0px_rgba(255,16,240,0.13)]" />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] h-[499.586px] items-start left-[32px] top-[200px] w-[240px]" data-name="StyleGuidePage">
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <div className="absolute bg-[rgba(255,16,240,0.1)] border border-[#ff10f0] border-solid h-[48.398px] left-0 rounded-[4px] top-0 w-[240px]" data-name="Button">
            <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.4px] left-[16px] not-italic text-[#ff10f0] text-[14px] top-[12.5px] whitespace-nowrap">1. Brand Identity</p>
          </div>
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <ButtonBackgroundImageAndText text="2. Color Palette" />
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <ButtonBackgroundImageAndText text="3. Typography" />
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <ButtonBackgroundImageAndText text="4. Buttons" />
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <ButtonBackgroundImageAndText text="5. Forms" />
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <ButtonBackgroundImageAndText text="6. Cards" />
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <BackgroundImage3>{`7. Tags & Badges`}</BackgroundImage3>
        </BackgroundImage5>
        <BackgroundImage5 additionalClassNames="h-[48.398px] w-[240px]">
          <ButtonBackgroundImageAndText text="8. Icon Library" />
        </BackgroundImage5>
        <BackgroundImage6 additionalClassNames="w-[240px]">
          <ButtonBackgroundImageAndText text="9. Content Patterns" />
        </BackgroundImage6>
      </div>
    </div>
  );
}