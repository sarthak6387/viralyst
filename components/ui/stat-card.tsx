interface Props {

  title: string;

  value: string;

  subtitle?: string;
}

export default function
StatCard({
  title,
  value,
  subtitle,
}: Props) {

  return (

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
      "
    >

      <p className="text-zinc-400">
        {title}
      </p>

      <h2
        className="
          mt-4
          text-5xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          to-purple-500
          bg-clip-text
          text-transparent
        "
      >
        {value}
      </h2>

      {
        subtitle && (

          <p className="mt-3 text-zinc-500">
            {subtitle}
          </p>
        )
      }

    </div>
  );
}