interface StepHeadingProps {
  title: string;
  description: string;
}

const StepHeading = ({ title, description }: StepHeadingProps) => {
  return (
    <div className="grid gap-1.5">
      <h1 className="text-a-20 font-semibold tracking-[-0.5px] text-main-title-3 sm:text-a-24">
        {title}
      </h1>

      <p className="text-a-14 text-sub-title-3">{description}</p>
    </div>
  );
};

export default StepHeading;
