import { SortProps } from './SortContainer';

export interface TypeItem {
  id: string;
}
interface TypeProps extends SortProps {
  memoizedTypes: { id: string }[];
}
export const Type = ({ handleChange, typeSelectRef, texts, memoizedTypes }: TypeProps) => {
  return (
    <select name="type" ref={typeSelectRef} className="mt-3 mb-4 flex rounded-full bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400" onChange={handleChange} defaultValue="Type">
      <option value="Type" disabled>
        {texts.type}
      </option>
      {memoizedTypes?.map((type: TypeItem, i: number) => {
        return (
          <option key={i} value={type.id}>
            {type.id}
          </option>
        );
      })}
    </select>
  );
};
