import { SortProps } from './SortContainer';

interface Option {
  id: string;
  value: boolean;
  text: string;
}

interface BooleanChooseFieldProps extends SortProps {
  fieldName: string;
  idValueDictionary: Option[];
}
export const BooleanChooseField = ({ fieldName, idValueDictionary, handleChange, form, texts }: BooleanChooseFieldProps) => {
  return (
    <ul className="flex w-full gap-4 md:gap-8 ">
      {idValueDictionary.map((option, i: number) => {
        return (
          <li key={i}>
            <p className="mb-5"></p>
            <input type="radio" className="peer mb-5 hidden" name={fieldName} checked={String(form?.[fieldName]) === String(option.value)} value={String(option.value)} id={option.id} onChange={handleChange} />
            <label htmlFor={option.id} className="bg- box-border inline-flex h-16 w-32 cursor-pointer items-center justify-between rounded-lg border p-4 text-gray-500 checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-900 hover:text-gray-200 dark:border-blue-900 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-400 md:flex ">
              <div className="block">
                <div className="w-full flex-nowrap text-sm font-semibold md:text-lg">{texts.category}</div>
                <div className="w-full">{option.text}</div>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
