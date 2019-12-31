
export default (
  mappings: { [key: string]: (prog: any) => void },
  subject: { [key: string]: boolean },
  def: () => void
) => {
  const activeKey = Object.keys(mappings).find(key => subject[key]);
  if (activeKey) mappings[activeKey](subject[activeKey]);
  else def();
};
