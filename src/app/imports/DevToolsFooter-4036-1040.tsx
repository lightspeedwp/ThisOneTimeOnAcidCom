import clsx from "clsx";
import svgPaths from "./svg-69ippkqytg";
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return <Wrapper4 additionalClassNames={clsx("relative shrink-0 w-[232.203px]", additionalClassNames)}>{children}</Wrapper4>;
}
type ListProps = {
  additionalClassNames?: string;
};

function List({ children, additionalClassNames = "" }: React.PropsWithChildren<ListProps>) {
  return <Wrapper4 additionalClassNames={clsx("relative w-[232.195px]", additionalClassNames)}>{children}</Wrapper4>;
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper2 additionalClassNames={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>{children}</Wrapper2>;
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper2 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper2>;
}

function Heading1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[10px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Heading({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative w-full">{children}</div>
      </div>
    </div>
  );
}
type LinkTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LinkText({ text, additionalClassNames = "" }: LinkTextProps) {
  return (
    <div className={clsx("absolute h-[20.398px] left-0 top-[4px]", additionalClassNames)}>
      <p className="absolute font-['Courier_New:Regular',sans-serif] leading-[20.4px] left-[12px] not-italic text-[#a1a1aa] text-[13.6px] top-[-1px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function DevToolsFooter() {
  return (
    <div className="bg-[#080808] relative size-full" data-name="DevToolsFooter">
      <div className="absolute content-stretch flex flex-col h-[384.781px] items-start left-0 top-0 w-[1171px]" data-name="Container">
        <div className="relative shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border-[rgba(0,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
            <div className="content-stretch flex h-[36px] items-center px-[10px] relative shrink-0" data-name="Link">
              <div className="h-[25px] relative shrink-0 w-[30px]" data-name="IconBase">
                <div className="absolute inset-[-93.91%_-80%_-94.09%_-80%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.9994 72">
                    <g filter="url(#filter0_d_4036_1044)" id="IconBase">
                      <g clipPath="url(#clip0_4036_1044)">
                        <path d={svgPaths.p2ca25300} fill="var(--fill-0, #FF10F0)" id="Vector" opacity="0.2" />
                        <path d={svgPaths.p861bf00} fill="var(--fill-0, #FF10F0)" id="Vector_2" />
                      </g>
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="73" id="filter0_d_4036_1044" width="78" x="-0.000299454" y="-0.523405">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="12" />
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.0627451 0 0 0 0 0.941176 0 0 0 0.6 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_1044" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_1044" mode="normal" result="shape" />
                      </filter>
                      <clipPath id="clip0_4036_1044">
                        <rect fill="white" height="25" transform="translate(23.9997 23.4766)" width="30" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <Wrapper additionalClassNames="h-[36px] w-[140.016px]">
                <p className="absolute font-['Courier_New:Bold',sans-serif] leading-[36px] left-[0.02px] not-italic text-[24px] text-white top-0 tracking-[1.2px] uppercase whitespace-nowrap">Dev Tools</p>
              </Wrapper>
            </div>
            <div className="content-stretch flex items-center justify-center opacity-80 px-[10px] relative shrink-0" data-name="Paragraph">
              <p className="font-['Courier_New:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[#39ff14] text-[16px] w-[557px]">A comprehensive design system reference with interactive specimens, component documentation, and testing tools.</p>
            </div>
          </div>
        </div>
        <Wrapper1 additionalClassNames="w-[1171px]">
          <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col h-[196.594px] items-start left-0 p-px rounded-[4px] top-0 w-[234.195px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Heading>
              <p className="flex-[1_0_0] font-['Courier_New:Bold',sans-serif] leading-[22.8px] min-h-px min-w-px not-italic relative text-[#39ff14] text-[15.2px] tracking-[0.76px] uppercase">Design Specimens</p>
            </Heading>
            <List additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Typography Specimens" additionalClassNames="w-[175.227px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Spacing Specimens" additionalClassNames="w-[150.75px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Shadow Specimens" additionalClassNames="w-[142.586px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Border Radius Specimens" additionalClassNames="w-[199.711px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Button Specimens" additionalClassNames="w-[142.586px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Card Specimens" additionalClassNames="w-[126.266px]" />
              </Wrapper>
              <Wrapper1 additionalClassNames="w-[232.195px]">
                <LinkText text="Neon Color Specimens" additionalClassNames="w-[175.227px]" />
              </Wrapper1>
            </List>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col h-[196.594px] items-start left-[234.2px] p-px rounded-[4px] top-0 w-[234.203px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Heading>
              <p className="flex-[1_0_0] font-['Courier_New:Bold',sans-serif] leading-[22.8px] min-h-px min-w-px not-italic relative text-[#1f51ff] text-[15.2px] tracking-[0.76px] uppercase">{`Reference & Docs`}</p>
            </Heading>
            <Wrapper3 additionalClassNames="h-[121.992px]">
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Design Tokens Reference" additionalClassNames="w-[199.711px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Icon Library" additionalClassNames="w-[109.938px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Phosphor Icons Browser" additionalClassNames="w-[191.555px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Component API Reference" additionalClassNames="w-[199.711px]" />
              </Wrapper>
              <Wrapper1 additionalClassNames="w-[232.203px]">
                <LinkText text="Color Palettes" additionalClassNames="w-[126.266px]" />
              </Wrapper1>
            </Wrapper3>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col h-[196.594px] items-start left-[468.4px] p-px rounded-[4px] top-0 w-[234.195px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="relative shrink-0 w-[233px]" data-name="Heading 3">
              <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative w-full">
                <p className="flex-[1_0_0] font-['Courier_New:Bold',sans-serif] leading-[22.8px] min-h-px min-w-px not-italic relative text-[#ff5f1f] text-[15.2px] tracking-[0.76px] uppercase">{`Builders & Playground`}</p>
              </div>
            </div>
            <List additionalClassNames="h-[73.195px] shrink-0">
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Component Playground" additionalClassNames="w-[175.227px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Code Snippet Generator" additionalClassNames="w-[191.555px]" />
              </Wrapper>
              <Wrapper1 additionalClassNames="w-[232.195px]">
                <LinkText text="Documentation Generator" additionalClassNames="w-[199.711px]" />
              </Wrapper1>
            </List>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col h-[196.594px] items-start left-[702.59px] p-px rounded-[4px] top-0 w-[234.203px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Heading>
              <p className="flex-[1_0_0] font-['Courier_New:Bold',sans-serif] leading-[22.8px] min-h-px min-w-px not-italic relative text-[#ff10f0] text-[15.2px] tracking-[0.76px] uppercase">{`Testing & Deployment`}</p>
            </Heading>
            <Wrapper3 additionalClassNames="h-[146.391px]">
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Code Quality Monitor" additionalClassNames="w-[175.227px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Deployment Readiness" additionalClassNames="w-[175.227px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Visual Regression Tester" additionalClassNames="w-[207.875px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Integration Tester" additionalClassNames="w-[158.906px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.203px]">
                <LinkText text="Accessibility Tester" additionalClassNames="w-[175.227px]" />
              </Wrapper>
              <Wrapper1 additionalClassNames="w-[232.203px]">
                <LinkText text="Performance Tester" additionalClassNames="w-[158.906px]" />
              </Wrapper1>
            </Wrapper3>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col h-[196.594px] items-start left-[936.8px] p-px rounded-[4px] top-0 w-[234.195px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Heading1>
              <p className="font-['Courier_New:Bold',sans-serif] leading-[22.8px] not-italic relative shrink-0 text-[#00f7ff] text-[15.2px] tracking-[0.76px] uppercase whitespace-nowrap">Content Specimens</p>
            </Heading1>
            <List additionalClassNames="h-[97.594px] shrink-0">
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Blog Post Specimens" additionalClassNames="w-[167.07px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Portfolio Entry Specimens" additionalClassNames="w-[216.039px]" />
              </Wrapper>
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Video Specimens" additionalClassNames="w-[134.422px]" />
              </Wrapper>
              <Wrapper1 additionalClassNames="w-[232.195px]">
                <LinkText text="Podcast Episode Specimens" additionalClassNames="w-[216.039px]" />
              </Wrapper1>
            </List>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col h-[74.602px] items-start left-0 p-px rounded-[4px] top-[196.59px] w-[234.195px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Heading1>
              <p className="flex-[1_0_0] font-['Courier_New:Bold',sans-serif] leading-[22.8px] min-h-px min-w-px not-italic relative text-[#be00fe] text-[15.2px] tracking-[0.76px] uppercase">{`Card & Layout Lab`}</p>
            </Heading1>
            <List additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
              <Wrapper additionalClassNames="h-[24.398px] w-[232.195px]">
                <LinkText text="Component Showcase" additionalClassNames="w-[158.906px]" />
              </Wrapper>
              <Wrapper1 additionalClassNames="w-[232.195px]">
                <LinkText text="Analytics Dashboard" additionalClassNames="w-[167.07px]" />
              </Wrapper1>
            </List>
          </div>
        </Wrapper1>
        <div className="bg-gradient-to-r from-[rgba(0,0,0,0)] h-px opacity-50 shrink-0 to-[rgba(0,0,0,0)] via-1/2 via-[#00f7ff] w-[1171px]" data-name="Horizontal Rule" />
        <div className="bg-[rgba(0,0,0,0.8)] relative rounded-[4px] shrink-0 w-[1171px]" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(0,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[10px] py-[4px] relative w-full">
            <div className="content-stretch flex gap-[4px] items-center leading-[20.4px] not-italic relative shrink-0 text-[13.6px] uppercase whitespace-nowrap" data-name="Container">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <p className="col-1 font-['Courier_New:Bold',sans-serif] ml-0 mt-0 relative row-1 text-[#ff10f0]">27</p>
                <p className="col-1 font-['Courier_New:Regular',sans-serif] ml-[18px] mt-0 relative row-1 text-[#39ff14]">dev Tools</p>
              </div>
              <p className="font-['Courier_New:Regular',sans-serif] relative shrink-0 text-[rgba(255,255,255,0.3)]">•</p>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <p className="col-1 font-['Courier_New:Bold',sans-serif] ml-0 mt-0 relative row-1 text-[#ff10f0]">6</p>
                <p className="col-1 font-['Courier_New:Regular',sans-serif] ml-[10px] mt-0 relative row-1 text-[#39ff14]">categories</p>
              </div>
              <p className="font-['Courier_New:Regular',sans-serif] relative shrink-0 text-[rgba(255,255,255,0.3)]">•</p>
              <p className="font-['Courier_New:Regular',sans-serif] relative shrink-0 text-[#39ff14]">System Active_</p>
            </div>
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex gap-[2px] h-full items-center px-[5px] py-px relative rounded-[4px] shrink-0" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#00f7ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="h-[13px] relative shrink-0 w-[10px]" data-name="IconBase">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13">
                    <g clipPath="url(#clip0_4036_1048)" id="IconBase">
                      <path d={svgPaths.p139b6e00} fill="var(--fill-0, #00F7FF)" id="Vector" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4036_1048">
                        <rect fill="white" height="13" width="10" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <Wrapper additionalClassNames="h-[13px] w-[93px]">
                  <p className="-translate-x-1/2 absolute font-['Courier_New:Bold',sans-serif] h-[13px] leading-[14px] left-[46.5px] not-italic text-[#00f7ff] text-[14px] text-center top-0 uppercase w-[93px]">Back to top</p>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_20px_40px_0px_rgba(0,255,255,0.05)]" />
    </div>
  );
}