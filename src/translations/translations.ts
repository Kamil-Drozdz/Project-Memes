export const texts = {
  en: {
    hi: 'Hi',
    close: 'close',
    subscribe: 'Subscribe',
    subscribeDescription: 'removes ads, gives premium access',
    sortMemes: 'Sort memes',
    browse: 'Browsing memes',
    generateMeme: 'Generate meme',
    myProfil: 'My profile',
    selectImage: 'Select image',
    download: 'Download',
    upload: 'Upload',
    removeText: 'Remove text',
    colorText: 'Black text',
    addTextTop: 'Add text on top meme',
    addTextBot: 'Add text on bottom meme',
    changeFontSize: 'change your font size, current',
    errorTextLengthTop: 'Text is too long for the image, change font size on top text',
    errorTextLengthBot: 'Text is too long for the image, change font size on bottom text',
    errorSavingImage: 'Error saving the image',
    succesSavingImage: 'Image saved successfully',
    userNick: 'User name',
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    register: 'Register',
    back: 'Back to login form',
    logIn: 'Log in',
    logInTest: 'Click for quick log in',
    logInPremium: 'Log in to buy a subscription',
    remindPassword: 'Remind password',
    sendPassword: 'Send password reset link',
    forgetPassword: 'Forget password?',
    missing: "We've lost you, go back to the",
    mainPage: 'Main page',
    or: 'or',
    category: 'Category',
    type: 'Type',
    sort: 'Sort',
    unauthorized: 'You shall not pass!',
    sfw: 'SFW',
    nsfw: 'NSFW',
    cropped: 'Cropped',
    unCropped: 'Uncropped',
    meme: 'Meme',
    notMeme: 'Not Meme',
    searchMeme: 'Looking for a meme...',
    memeIdNotFound: "Sorry, we can't find this meme with the given ID in the database, try another one",
    notificationToastWarn: 'Oops we have a problem, no meme available, please contact support',
    notificationToastSuccesLike: 'You like it',
    notificationToastSuccesDisLike: "You don't like it",
    notificationToastReset: 'Rating for this meme has been reset',
    notificationToastSuccesSortMeme: 'Meme has been sorted!',
    notificationToastErrorSortMeme: 'Meme was not sorted, please contact support',
    linkCopied: 'Link meme copied!',
    linkCopiedError: 'link meme not copied, please try again!',
    addComment: 'Add comment',
    addFirstComment: 'Add first comment!',
    comments: 'Comments',
    loadingComments: 'Loading comments',
    undefinedDateText: 'date has not been specified',
    errorMessageComment: 'Comment cannot be empty!',
    userMessageComment: 'You must be logged in to add a comment',
    projectDocumentation: 'Project Documentation',
    features: 'Features',
    projectDocs: {
      introduction: `This project was created using Create React App (CRA) and is designed as a single-page application (SPA). The purpose of the application is to provide a platform for browsing memes with various features, such as sorting options and meme generation. The backend of the application was developed by an experienced programmer using PHP and the PostgreSQL database.`,
      accessAndAuthorization: `Due to the requirement of an endpoint token for authorization, the application currently requires users to log in even on the base page. This means that users must log in before accessing any data or features on the platform. This is a temporary restriction and future improvements are planned to enhance the application's security features.`,
      features: `Infinity Scroll: Users can browse an infinite number of memes on the platform.`,
      SortingOptions: ` Users can sort memes based on different criteria like category, type and well trimmed is it a meme etc.`,
      MemeGeneration: ` Users can generate their memes by uploading images.`,
      HOC: `The application implements Higher-Order Components (HOC) and context to manage the state of the application.`,
      backendDevelopment: `The backend of the application was developed by using PHP and the PostgreSQL database. The developer thoroughly tested the entire development process and merged the code into the develop branch.`,
      revenueModel: `We decided to use Stripe for payment processing in the project. We believe that when it comes to payment processing, it's best to use the best and most tested solutions available on the market. Stripe is a reliable and popular service that offers many payment-related features, including integration with various payment methods and tools for managing subscriptions.
        Using Stripe allowed us to provide a secure and convenient payment process for users of the application. As a result, users can easily make payments for subscriptions and access premium features on our platform in a quick and seamless manner.
        To test the payment use the card number: 4242 4242 4242 4242 4242 and a random CVC number as well as a future date`,
      info: 'The memes displayed from the database are not intended to offend anyone and are solely for humorous purposes, as well as to showcase certain programming techniques in the portfolio'
    }
  },
  pl: {
    hi: 'Cześć',
    close: 'zamknij',
    subscribe: 'Subskrybuj',
    subscribeDescription: 'usuwa reklamy, daje dostęp premium',
    sortMemes: 'Sortuj memy',
    browse: 'Przeglądaj memy',
    generateMeme: 'Generuj mema',
    myProfil: 'Mój profil',
    selectImage: 'Wybierz zdjęcie',
    download: 'Pobierz',
    upload: 'Prześlij',
    removeText: 'Usuń tekst',
    colorText: 'Czarny tekst',
    addTextTop: 'Dodaj tekst na górze mema',
    addTextBot: 'Dodaj tekst na dole mema',
    changeFontSize: 'zmień rozmiar czcionki, aktualny',
    errorTextLengthTop: 'Tekst jest za długi w stosunku do obrazu, zmień rozmiar czcionki w górnym tekście',
    errorTextLengthBot: 'Tekst jest za długi w stosunku do obrazu, zmień rozmiar czcionki w dolnym tekście',
    errorSavingImage: 'Mem nie został zapisany',
    succesSavingImage: 'Mem został zapisany!',
    userNick: 'Nazwa użytkownika',
    email: 'Adres email',
    password: 'Hasło',
    confirmPassword: 'Potwierdź hasło',
    register: 'Zajerestruj',
    back: 'Cofnij do logowania',
    logIn: 'Zaloguj',
    logInTest: 'Szybkie logowanie',
    logInPremium: 'Zaloguj, żeby wykupić subskrypcję',
    remindPassword: 'Przypomnij hasło',
    sendPassword: 'Wyślij link do resetowania hasła',
    forgetPassword: 'Zapomniałeś hasła?',
    missing: 'Straciliśmy cię, wróć do',
    mainPage: 'Głównej strony',
    or: 'Albo',
    category: 'Kategoria',
    type: 'Typ',
    sort: 'Sortuj',
    unauthorized: 'Tutaj nie masz wstępu!',
    sfw: 'Bezpieczny',
    nsfw: 'Niebezpieczny',
    cropped: 'Przycięty',
    unCropped: 'Nieprzycięty',
    meme: 'Mem',
    notMeme: 'to nie Mem',
    searchMeme: 'Szukam mema...',
    memeIdNotFound: 'Wybacz nie możemy znaleść tego mema o podanym ID w bazie danych spróbuj innego',
    notificationToastWarn: 'Ups, mamy problem, mem nie jest dostępny, skontaktuj się z pomocą techniczną',
    notificationToastSuccesLike: 'Polubiłeś mema',
    notificationToastSuccesDisLike: 'Nie lubisz tego mema',
    notificationToastReset: 'Ocena tego mema została zresetowana',
    notificationToastSuccesSortMeme: 'Mem został posortowany!',
    notificationToastErrorSortMeme: 'Mem nie został posortowany, skontaktuj się z pomocą techniczną',
    linkCopied: 'Skopiowano link mema!',
    linkCopiedError: 'Nie skopiowano linku mema, spróbuj ponownie!',
    addComment: 'Dodaj komentarz',
    addFirstComment: 'Dodaj pierwszy komentarz!',
    comments: 'Komenatrze',
    loadingComments: 'Ładuję komentarze',
    undefinedDateText: 'data nie została określona',
    errorMessageComment: 'Komentarz nie może być pusty!',
    userMessageComment: 'Musisz być zalogowany, żeby dodać komentarz',
    projectDocumentation: 'Dokumentacja projektu',
    features: 'Cechy',
    projectDocs: {
      introduction: ` Ten projekt został stworzony w React stylowanie aplikacji zostało wykonane za pomocą Tailwind CSS. Jest to aplikacja jednostronicowa (SPA). Celem aplikacji jest dostarczenie platformy do przeglądania memów z różnymi funkcjami, takimi jak opcje sortowania i generowanie memów dodawanie komentarzy i innych. Backend aplikacji został opracowany przez doświadczonego programistę za pomocą PHP(Symfony) i bazy danych PostgreSQL łączącego frontend za pomocą REST API.`,
      accessAndAuthorization: `Aplikacja umożliwia przeglądanie memów bez konieczności logowania się, co pozwala użytkownikom na łatwy dostęp do zawartości. Jednakże, aby korzystać z zaawansowanych funkcji, takich jak dodawanie polubień, komentowanie czy sortowanie oraz generowanie własnych memów, wymagane jest zalogowanie się przez użytkownika.`,
      features: ` Nieskończony scroll: Użytkownicy mogą przeglądać nieskończoną liczbę memów na platformie, dodawać like i komentarze`,
      SortingOptions: `Użytkownicy mogą sortować memy na podstawie różnych kryteriów, takich jak kategoria, typ i inne.`,
      MemeGeneration: ` Użytkownicy mogą generować swoje memy poprzez przesyłanie obrazów.`,
      HOC: ` Aplikacja implementuje Higher-Order Components (HOC) i kontekst do zarządzania stanem aplikacji.`,
      revenueModel: `W projekcie zdecydowaliśmy się skorzystać z rozwiązania Stripe do obsługi płatności. Jesteśmy zdania, że jeśli chodzi o przetwarzanie płatności, warto skorzystać z najlepszych i przetestowanych rozwiązań dostępnych na rynku. Stripe to solidny i popularny serwis, który oferuje wiele funkcji związanych z płatnościami, w tym integrację z różnymi metodami płatności oraz narzędzia do obsługi abonamentów.
        Korzystanie z Stripe umożliwi nam zapewnienie bezpiecznego i wygodnego procesu płatności dla użytkowników aplikacji. Dzięki temu użytkownicy mogą dokonywać płatności za subskrypcje i otrzymywać dostęp do funkcji premium na naszej platformie w sposób szybki i łatwy.
        Żeby przetestować płatność użyj nr karty: 4242 4242 4242 4242 4242 i  losowy numer CVC jak i przyszłą datę. `,
      info: 'Memy wyświetlane z bazy danych nie mają na celu obrażania nikogo i służą wyłącznie do celów humorystycznych, a także do pokazania określonych technik programistycznych w portfolio.'
    }
  }
};
