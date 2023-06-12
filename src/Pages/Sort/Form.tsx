import { Category } from './Category';
import { Type } from './Type';
import { BooleanChooseField } from './BooleanChooseField';
import { SortProps } from './SortContainer';
import TypeContainer from './TypeContainer';

export const Form = ({ texts, form, formErrors, handleSubmit, categorySelectRef, typeSelectRef, handleChange }: SortProps) => {
  const hasEmptyFields = formErrors && Object.values(formErrors).some((error) => error);

  return (
    <form className=" ml-4 pt-4 md:mx-16 md:pt-12" onSubmit={handleSubmit}>
      <Category texts={texts} handleChange={handleChange} categorySelectRef={categorySelectRef} />
      <TypeContainer texts={texts} handleChange={handleChange} typeSelectRef={typeSelectRef} />
      {form && (
        <>
          <BooleanChooseField
            texts={texts}
            form={form}
            handleChange={handleChange}
            fieldName="isNsfw"
            idValueDictionary={[
              { id: 'sfw', value: true, text: texts.sfw || '' },
              { id: 'nsfw', value: false, text: texts.nsfw || '' }
            ]}
          />
          <BooleanChooseField
            texts={texts}
            form={form}
            handleChange={handleChange}
            fieldName="isUncropped"
            idValueDictionary={[
              { id: 'cropped', value: true, text: texts.cropped || '' },
              { id: 'uncropped', value: false, text: texts.unCropped || '' }
            ]}
          />
          <BooleanChooseField
            texts={texts}
            form={form}
            handleChange={handleChange}
            fieldName="isMeme"
            idValueDictionary={[
              { id: 'meme', value: true, text: texts.meme || '' },
              { id: 'notmeme', value: false, text: texts.notMeme || '' }
            ]}
          />
        </>
      )}
      <button type="submit" disabled={hasEmptyFields} className="mb-4 mt-3 flex rounded-full bg-gray-300 py-2 px-4 font-bold text-gray-800 disabled:opacity-25 hover:bg-gray-400 md:mb-24">
        {texts.sort}
      </button>
    </form>
  );
};
