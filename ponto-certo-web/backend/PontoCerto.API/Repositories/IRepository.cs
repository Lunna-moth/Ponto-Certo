namespace PontoCerto.API.Repositories;

public interface IRepository<T> where T : class
{
  Task<IEnumerable<T>> GetAllAsync();
  Task<T> GetByIdAsync(int id);
  Task<T> CreateAsync(T entity);
  Task<T> UpdateAsync(T entity);
  Task<bool> Delete(int id);
}
