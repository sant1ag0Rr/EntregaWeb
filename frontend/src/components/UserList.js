export default function UserList({ users, error }) {
  return (
    <section
      id="usuarios"
      className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-panel"
    >
      <div className="flex flex-col gap-6 px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
              Users API - Local sincronizada
            </span>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-white">
                Usuarios renderizados desde el mismo backend de Postman
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-300">
                Esta lista consume <span className="font-semibold text-white">GET /api/users</span> y
                muestra solo los campos definidos en tu contrato: <span className="font-semibold text-white">id</span>,{" "}
                <span className="font-semibold text-white">name</span> y{" "}
                <span className="font-semibold text-white">email</span>.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            {error ? "Sin conexion con el backend" : `${users.length} usuarios disponibles`}
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-rose-400/25 bg-rose-400/10 p-5 text-sm leading-6 text-rose-100">
            {error}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <article
                key={user.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Usuario</p>
                      <h3 className="mt-2 text-xl font-bold text-white">{user.name}</h3>
                    </div>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      Activo
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
                      <p className="mt-2 break-all text-white">{user.email}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Id</p>
                      <p className="mt-2 break-all font-mono text-xs text-cyan-100">{user.id}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
