const Genshin = () => {
  return (
    <div>
      <form action="/api/genshin/calc" method="get">
        <input
          type="text"
          name="genshin_command"
          placeholder="Genshin command"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Genshin;
