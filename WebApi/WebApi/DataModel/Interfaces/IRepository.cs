
using System.Collections.Generic;

namespace DocBook.DataModel.Interfaces
{
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// List all the entities
        /// </summary>
        List<T> List();

        /// <summary>
        /// Inserts new record
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        T Insert(T entity);

        /// <summary>
        /// Updates the record
        /// </summary>
        /// <param name="entity"></param>
        void Update(T entity);

        /// <summary>
        /// Deletes the record
        /// </summary>
        /// <param name="id"></param>
        void Delete(int id);

        /// <summary>
        /// Gets the record by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T GetById(int id);
    }
}
