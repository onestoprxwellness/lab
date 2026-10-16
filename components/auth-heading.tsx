interface AuthHeadingProps {
  title: string;
  description: string;
}

const AuthHeading = ({ title, description }: AuthHeadingProps) => {
  return (
    <div className="mt-10 mb-8 grid gap-1 text-center">
      <h1 className="text-a-24 font-semibold tracking-[-0.5px] text-main-title-3">
        {title}
      </h1>

      <p className="text-a-14 text-sub-title-3">{description}</p>
    </div>
  );
};

export default AuthHeading;
