# Django Part (Creating API)

1. `django-admin startproject django-crud`
2. `python3 manage.py startapp api`
3. `settings.py`
```
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]


INSTALLED_APPS = [
    "rest_framework",
    "api",
    "corsheaders", 
]


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]
```
4. `url.py (project)`
```
from django.urls import include, path
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```
5. `models.py`
```
class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    year = models.DateField()

    def __str__(self):
        return self.title
```
6. `admin.py`
```
from .models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'year']
```
7. `serializers.py`
```
from rest_framework import routers, serializers, viewsets
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'year']

class MovieMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title']
```
8. `views.py`
```
from .models import Movie
from rest_framework import viewsets
from .serializers import MovieSerializer
from rest_framework.response import Response

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-year')
    serializer_class = MovieSerializer

    def list(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
```

# Angular Part (Front-End)
1. `ng new crud_angular`
2. `ng g servce api`
3. `app.module.ts`
```
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
})
```
4. `app.component.ts`
```
import { Component } from '@angular/core';
import { ApiService } from './api.service';

export class AppComponent {
  movies = [{ title: 'test' }];
  selectedMovie: any;

  constructor(private api: ApiService) {
    this.getMovies();
    this.selectedMovie = { id: -1, title: '', description: '', year: '' };
  }
  getMovies = () => {
    this.api.getAllMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  movieClicked(movie: any) {
    this.api.getOneMovie(movie.id).subscribe(
      (data) => {
        this.selectedMovie = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateMovie() {
    this.api.updateMovie(this.selectedMovie).subscribe(
      (data) => {
        this.getMovies();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createMovie() {
    this.api.createMovie(this.selectedMovie).subscribe(
      (data) => {
        this.movies.push(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteMovie() {
    this.api.deleteMovie(this.selectedMovie.id).subscribe(
      (data) => {
        this.getMovies();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
```
5. `app.component.html`
```
<h2>List of movies</h2>
<ul>
  <li *ngFor="let movie of movies">
    <h3 (click)="movieClicked(movie)" >{{ movie.title }}</h3>
  </li>
</ul>

<hr>
Title: <input type="text" [(ngModel)]="selectedMovie.title"> <br>
Description: <input type="text" [(ngModel)]="selectedMovie.description"> <br>
Year: <input type="text" [(ngModel)]="selectedMovie.year"> <br>

<button *ngIf="selectedMovie.id != -1" (click)="updateMovie()" >Update</button>
<button *ngIf="selectedMovie.id == -1"  (click)="createMovie()" >Create</button>
<button *ngIf="selectedMovie.id != -1"  (click)="deleteMovie()" >Delete</button>
```
6. `api.service.ts`
```
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ApiService {
  baseurl = 'http://localhost:8000';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get(this.baseurl + '/movies/', {
      headers: this.httpHeaders,
    });
  }

  getOneMovie(id: any): Observable<any> {
    return this.http.get(this.baseurl + '/movies/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  updateMovie(movie: any): Observable<any> {
    const body = {
      title: movie.title,
      description: movie.description,
      year: movie.year,
    };
    return this.http.put(this.baseurl + '/movies/' + movie.id + '/', body, {
      headers: this.httpHeaders,
    });
  }

  createMovie(movie: any): Observable<any> {
    const body = {
      title: movie.title,
      description: movie.description,
      year: movie.year,
    };
    return this.http.post(this.baseurl + '/movies/', body, {
      headers: this.httpHeaders,
    });
  }

  deleteMovie(id: any): Observable<any> {
    return this.http.delete(this.baseurl + '/movies/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
```
![django_api](https://github.com/Krish123-lang/django-angular-crud/assets/56486342/acbfe8d2-8e24-4b6c-a9e6-ee9332b790e3)

![front-end](https://github.com/Krish123-lang/django-angular-crud/assets/56486342/14f7ddd6-1e8b-472b-828a-43503cfcd2fd)

