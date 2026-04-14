export default function Sidebar() {
  return (
    <div className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative size-full text-[32px] text-black" data-name="sidebar" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(242, 255, 222) 0%, rgb(242, 255, 222) 100%)" }}>
      <p className="absolute left-[72px] top-[132px]">Home</p>
      <p className="absolute left-[72px] top-[310px]">Post a Job</p>
      <p className="absolute left-[72px] top-[488px]">Messages</p>
      <p className="absolute left-[72px] top-[577px]">Settings</p>
      <p className="absolute left-[72px] top-[399px]">Profile</p>
      <p className="absolute left-[72px] top-[221px]">View Jobs</p>
      <p className="absolute left-[72px] top-[666px]">Calendar</p>
    </div>
  );
}