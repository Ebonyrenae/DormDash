import svgPaths from "./svg-6s80u5z677";

function Link() {
  return (
    <div className="h-[95.998px] relative shrink-0 w-full" data-name="Link">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[96px] left-[255.77px] not-italic text-[#29ac3d] text-[64px] text-center top-px tracking-[0.2188px]">DormDash 🏃‍💨</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[256.45px] not-italic text-[#4a5565] text-[20px] text-center top-[-0.22px] tracking-[-0.4492px]">College students helping college students</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[125.998px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Paragraph />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-0 not-italic text-[#101828] text-[24px] top-[-0.67px] tracking-[0.0703px]">Welcome Back</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.22px] tracking-[-0.1504px]">Sign in to continue to DormDash</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[64.991px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph1 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.78px] tracking-[-0.2344px]">College Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="absolute h-[57.101px] left-0 rounded-[10px] top-0 w-[431.997px]" data-name="Email Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[16px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] tracking-[-0.3125px]">you@university.edu</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15">
            <path d={svgPaths.p166aa800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_45.85%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.68%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3335 6.66345">
            <path d={svgPaths.p3f489440} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[18.55px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[57.101px] relative shrink-0 w-full" data-name="Container">
      <EmailInput />
      <Container6 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[17.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-[0.67px]">Must be a valid .edu email address</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[113.585px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container5 />
      <Paragraph2 />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#364153] text-[14px] top-[0.22px] tracking-[-0.1504px]">Password</p>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute h-[57.101px] left-0 rounded-[10px] top-0 w-[431.997px]" data-name="Password Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[16px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] tracking-[-0.3125px]">••••••••</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-9.09%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 10.8333">
            <path d={svgPaths.pe80de00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_29.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 9.16667">
            <path d={svgPaths.p29959600} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[18.55px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[57.101px] relative shrink-0 w-full" data-name="Container">
      <PasswordInput />
      <Container9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[86.094px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container8 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#00a63e] h-[47.986px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[215.8px] not-italic text-[16px] text-center text-white top-[11.22px] tracking-[-0.3125px]">Sign In</p>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[23.993px] h-[295.651px] items-start relative shrink-0 w-full" data-name="Form">
      <Container4 />
      <Container7 />
      <Button />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[216px] not-italic text-[#29ac3d] text-[14px] text-center top-[1.44px] tracking-[-0.1504px]">{`Don't have an account? Sign up`}</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white h-[528.628px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[31.997px] items-start pt-[40px] px-[40px] relative size-full">
        <Container3 />
        <Form />
        <Container10 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[686.623px] relative shrink-0 w-[511.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[31.997px] items-start relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

export default function EnhanceWebAppDesign() {
  return (
    <div className="bg-[#f2ffde] content-stretch flex items-center justify-center relative size-full" data-name="Enhance Web App Design">
      <Container />
    </div>
  );
}