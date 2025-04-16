import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  const {
    currentProducts,
    categories,
    isLoadingCategories,
    currentPage,
    totalPages,
    pageNumbers,
    selectedCategory,
    sortBy,
    paginate,
    setSelectedCategory,
    setSortBy,
    isLoadingProducts,
    productsPerPage,
  } = useContext(ProductContext);

  const handlePrev = () => currentPage > 1 && paginate(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && paginate(currentPage + 1);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-[200px] rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
    </div>
  );

  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 lg:mx-8 md:mx-0">
            <h1 className="text-3xl font-semibold text-center md:text-left">
              Explore Our Products
            </h1>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Sort Dropdown */}
              <div className="w-full md:w-auto">
                <label htmlFor="sort-filter" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="default">Sort by: Recommended</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="aToZ">Name: A to Z</option>
                  <option value="zToA">Name: Z to A</option>
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="w-full md:w-auto">
                <label htmlFor="category-filter" className="sr-only">
                  Filter by category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isLoadingCategories}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {isLoadingCategories ? (
                    <option>Loading categories...</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {Array.from({ length: productsPerPage }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {currentProducts.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md border ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed border-gray-200"
                          : "text-gray-700 hover:bg-gray-100 border-gray-300"
                      }`}
                    >
                      &laquo; Prev
                    </button>

                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-md border ${
                          currentPage === number
                            ? "bg-blue-500 text-white border-blue-500"
                            : "text-gray-700 hover:bg-gray-100 border-gray-300"
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-md border ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed border-gray-200"
                          : "text-gray-700 hover:bg-gray-100 border-gray-300"
                      }`}
                    >
                      Next &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
