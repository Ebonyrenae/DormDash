import svgPaths from "./svg-swdlzaec5";

function Link() {
  return (
    <div className="h-[53.993px] relative shrink-0 w-full" data-name="Link">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[54px] left-[224.23px] not-italic text-[#29ac3d] text-[36px] text-center top-[0.56px] tracking-[0.3691px]">DORMDASH 🏃‍💨</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[224.64px] not-italic text-[#4a5565] text-[16px] text-center top-[-0.78px] tracking-[-0.3125px]">College students helping college students</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[77.986px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Paragraph />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-0 not-italic text-[#101828] text-[24px] top-[-0.67px] tracking-[0.0703px]">Create Account</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.22px] tracking-[-0.1504px]">Sign up with your .edu email to get started</p>
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
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#36534a] text-[14px] top-[0.22px] tracking-[-0.1504px]">Full Name</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="h-[49.097px] relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] tracking-[-0.3125px]">John Doe</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[78.09px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#36534a] text-[14px] top-[0.22px] tracking-[-0.1504px]">College Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="absolute h-[49.097px] left-0 rounded-[10px] top-0 w-[384.002px]" data-name="Email Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[12px] relative rounded-[inherit] size-full">
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

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[14.55px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[49.097px] relative shrink-0 w-full" data-name="Container">
      <EmailInput />
      <Container7 />
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

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[104.08px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container6 />
      <Paragraph2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#36534a] text-[14px] top-[0.22px] tracking-[-0.1504px]">Password</p>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute h-[49.097px] left-0 rounded-[10px] top-0 w-[384.002px]" data-name="Password Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[12px] relative rounded-[inherit] size-full">
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

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[14.55px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[49.097px] relative shrink-0 w-full" data-name="Container">
      <PasswordInput />
      <Container10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[78.09px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Container9 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#29ac3d] h-[47.986px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[191.93px] not-italic text-[16px] text-center text-white top-[11.22px] tracking-[-0.3125px]">Sign Up</p>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[15.998px] h-[356.241px] items-start relative shrink-0 w-full" data-name="Form">
      <Container4 />
      <Container5 />
      <Container8 />
      <Button />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[192.82px] not-italic text-[#29ac3d] text-[14px] text-center top-[1.44px] tracking-[-0.1504px]">Already have an account? Sign in</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white h-[557.205px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[23.993px] items-start pt-[31.997px] px-[31.997px] relative size-full">
        <Container3 />
        <Form />
        <Container11 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.005px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#101828] text-[18px] top-[0.78px] tracking-[-0.4395px]">Why DormDev?</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[11.979px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#29ac3d] text-[14px] top-[0.22px] tracking-[-0.1504px]">✓</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[240.356px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#36534a] text-[14px] top-[0.22px] tracking-[-0.1504px]">Connect with fellow students for help</p>
      </div>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[11.979px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#29ac3d] text-[14px] top-[0.22px] tracking-[-0.1504px]">✓</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[215.122px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#36534a] text-[14px] top-[0.22px] tracking-[-0.1504px]">Earn money by sharing your skills</p>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[11.979px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#29ac3d] text-[14px] top-[0.22px] tracking-[-0.1504px]">✓</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[215.668px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#36534a] text-[14px] top-[0.22px] tracking-[-0.1504px]">Safe and verified .edu community</p>
      </div>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text4 />
      <Text5 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[78.984px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[169.974px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[15.998px] items-start pt-[23.993px] px-[23.993px] relative size-full">
        <Heading1 />
        <List />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[869.158px] relative shrink-0 w-[447.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[31.997px] items-start relative size-full">
        <Container1 />
        <Container2 />
        <Container12 />
      </div>
    </div>
  );
}

function PQ() {
  return (
    <div className="bg-[#f2ffde] h-[933.151px] relative shrink-0 w-full" data-name="pQ">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.009px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

export default function EnhanceWebAppDesign() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Enhance Web App Design">
      <PQ />
    </div>
  );
}