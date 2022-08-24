const user=localStorage.getItem('inpVal')

const nav=document.querySelector('nav');
nav.innerHTML=`
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
    <li class="nav-item">
        <a class="nav-link active" href="my-profile.html">${user}</a>
    </li>
  </ul>
</div>
</div>
`;