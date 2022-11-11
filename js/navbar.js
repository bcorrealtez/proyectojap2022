const user = JSON.parse(localStorage.getItem("user"));

function clSesion() {
  localStorage.clear();
  window.location.replace("index.html");
}

const nav = document.querySelector("nav");
nav.innerHTML = `
<div class="container">
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav w-100 justify-content-between">
    <li class="nav-item">
      <a class="nav-link active" href="home.html">Inicio</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="categories.html">Categorías</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="sell.html">Vender</a>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button"  data-bs-toggle="dropdown" aria-expanded="false">
          ${user.mail}
        </a>
        <ul class="dropdown-menu start-50 mt-1 navbar-dark bg-dark text-center px-3"  aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <a class="nav-link" href="cart.html">Mi carrito</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="my-profile.html">Mi perfil</a>
          </li>
          <li class="nav-item">
            <hr class="dropdown-divider bg-light">
          </li>
          <li class="nav-item">
            <button class="btn btn-dark px-2" onclick="clSesion()">Cerrar sesión</button>
          </li>
        </ul>
    </li>
  </ul>
</div>
</div>
`;
