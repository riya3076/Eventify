/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Front: React.FC = () => {
    const [searchBar, setSearchBar] = useState<boolean>(false);

    return (
        <section className="z-10">
            <div className="sm:w-11/12 mx-auto">
                <div
                    className={`py-8 sm:rounded-3xl relative w-full h-[620px] bg-homefrontbg bg-cover lg:bg-center bg-no-repeat bg-left`}
                >
                    <div className="absolute bottom-[60%] sm:left-[6%] left-[5%]">
                        <h1 className="text-white text-2lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl animate-slide-in">
                            Connect, Create, Celebrate
                        </h1>
                    </div>
                    <div className="absolute bottom-[24%] sm:left-[6%] left-[5%] flex items-center flex-wrap gap-4">
                        {searchBar && (
                            <form className="flex items-end gap-4 flex-wrap">
                                <SearchBar />
                            </form>
                        )}
                        {!searchBar && (
                            <button
                                type="button"
                                onClick={() => setSearchBar(!searchBar)}
                                className="sm:text-[20px] text-white sm:px-10 px-3 py-3 rounded-md border-[1px] border-white capitalize sm:w-auto w-full font-bold"
                            >
                                Discover Events
                            </button>
                        )}
                    </div>
                    <article className="lg:flex hidden items-end absolute top-[30%] right-0 w-[30%] border-l-2 h-1/2 px-2 border-l-white">
                        <div className="text-white text-[26px] w-[80%]">
                            Discover the perfect events, collaborators, and initiatives for unforgettable experiences
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Front;
