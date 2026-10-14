interface AuthHeadingProps {
  title: string;
  description: string;
}

const AuthHeading = ({ title, description }: AuthHeadingProps) => {
  return (
    <div className="grid gap-2 mt-10 mb-6 text-center">
      <h1 className="text-2xl font-bold tracking-[-0.2px]">{title}</h1>

      <p className="text-muted-foreground text-a-14 sm:text-base leading-relaxed text-balance">
        {description}
      </p>
    </div>
  );
};

export default AuthHeading;
