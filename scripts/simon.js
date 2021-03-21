const amarillo = document.getElementById('amarillo');
const azul = document.getElementById('azul');
const rojo = document.getElementById('rojo');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(() => this.siguienteNivel(), 500);
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      amarillo,
      azul,
      rojo,
      verde,
    };
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide');
    } else {
      btnEmpezar.classList.add('hide');
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(num) {
    switch (num) {
      case 0:
        return 'amarillo';
      case 1:
        return 'azul';
      case 2:
        return 'rojo';
      case 3:
        return 'verde';
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'amarillo':
        return 0;
      case 'azul':
        return 1;
      case 'rojo':
        return 2;
      case 'verde':
        return 3;
    }
  }

  iluminarSecuencia() {
    let i = 0;
    while (i < this.nivel) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
      i++;
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light');
  }

  agregarEventosClick() {
    this.colores.amarillo.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
    this.colores.azul.addEventListener('click', this.elegirColor);
    this.colores.rojo.addEventListener('click', this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.amarillo.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);
    this.colores.azul.removeEventListener('click', this.elegirColor);
    this.colores.rojo.removeEventListener('click', this.elegirColor);
  }

  elegirColor(ev) {
    console.log(ev);
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }

  ganoElJuego() {
    swal('Platzi', '¡Felicitaciones, ganaste el juego!', 'success').then(
      this.inicializar()
    );
  }

  perdioElJuego() {
    swal('Platzi', 'Lo lamentamos, perdiste :(', 'error').then(() => {
      this.eliminarEventosClick;
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
